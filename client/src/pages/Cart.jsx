import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, clearCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const applyCoupon = async () => {
    try {
      setCouponError('');
      const { data } = await axios.get(`${API_URL}/coupons/${couponCode}`);
      setDiscount(data.discountPercentage);
    } catch (error) {
      setCouponError('Invalid or expired coupon');
      setDiscount(0);
    }
  };

  const checkoutHandler = async () => {
    if (!userInfo) {
      navigate('/login?redirect=cart');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
      const totalValue = subtotal - (subtotal * (discount / 100));

      // 1. Create Razorpay order on backend
      const { data } = await axios.post(`${API_URL}/payment/create-order`, { amount: totalValue }, config);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'test_key_id', 
        amount: data.data.amount,
        currency: 'INR',
        name: 'Iffu',
        description: 'Premium Streetwear Checkout',
        order_id: data.data.id,
        handler: async function (response) {
          try {
            // 2. Verify payment
            const paymentResult = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            await axios.post(`${API_URL}/payment/verify`, paymentResult, config);

            // 3. Store order in Database
            const dbOrderData = {
              orderItems: cartItems,
              shippingAddress: { address: 'A-12', city: 'Mumbai', postalCode: '400001', country: 'India' },
              paymentMethod: 'Razorpay',
              itemsPrice: totalValue, // using discounted total as final
              shippingPrice: 0,
              totalPrice: totalValue,
            };

            const { data: dbOrder } = await axios.post(`${API_URL}/orders`, dbOrderData, config);

            // 4. Update order to Paid
            await axios.put(`${API_URL}/orders/${dbOrder._id}/pay`, {
              id: response.razorpay_payment_id,
              status: 'COMPLETED',
              update_time: new Date().toISOString(),
              email_address: userInfo.email,
            }, config);

            clearCart();
            navigate('/thank-you');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment Validation Failed.');
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: '9999999999'
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        console.error(response.error.description);
        alert('Payment Failed');
      });
      rzp1.open();

    } catch (error) {
      console.error('Error in checkout:', error);
      alert('Error initiating checkout flow.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter mb-12 border-b border-white/10 pb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10">
          <p className="text-xl text-gray-400 uppercase tracking-widest mb-6">Your cart is currently empty.</p>
          <Link to="/shop" className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Return to Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-2/3">
            {cartItems.map((item) => (
              <motion.div 
                layout
                key={item.product} 
                className="flex items-center gap-6 border-b border-white/10 py-6"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover md:w-32 md:h-32 bg-white/5" />
                <div className="flex-1">
                  <h3 className="font-heading uppercase tracking-wide text-lg md:text-xl mb-1">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </h3>
                  <p className="text-gray-400 text-sm font-mono tracking-widest mb-4">Size: L</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="font-mono font-medium">₹{item.price}</p>
                    <div className="flex border border-white/20 font-mono text-sm">
                      <button onClick={() => addToCart(item, item.qty - 1)} disabled={item.qty <= 1} className="px-3 py-1 hover:bg-white/10 cursor-pointer disabled:opacity-50">-</button>
                      <div className="w-10 flex justify-center items-center border-x border-white/20">{item.qty}</div>
                      <button onClick={() => addToCart(item, item.qty + 1)} disabled={item.qty === item.countInStock} className="px-3 py-1 hover:bg-white/10 cursor-pointer disabled:opacity-50">+</button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product)}
                  className="p-3 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white/5 border border-white/10 p-8 sticky top-24">
              <h2 className="text-xl font-heading font-bold uppercase tracking-widest border-b border-white/10 pb-4 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * (discount / 100)).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Promo Code</p>
                <div className="flex">
                  <input 
                    type="text" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)} 
                    placeholder="Enter code" 
                    className="flex-1 bg-black border border-white/20 p-3 text-sm font-mono focus:outline-none focus:border-white transition-colors"
                  />
                  <button onClick={applyCoupon} className="bg-white/10 hover:bg-white/20 px-4 text-sm font-bold uppercase tracking-widest transition-colors">Apply</button>
                </div>
                {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
                {discount > 0 && <p className="text-green-500 text-xs mt-2">Coupon applied successfully!</p>}
              </div>

              <div className="border-t border-white/10 pt-4 mb-8 flex justify-between items-end">
                <span className="uppercase tracking-widest font-bold">Total</span>
                <span className="text-2xl font-mono">₹{(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * (1 - discount/100)).toFixed(2)}</span>
              </div>

              <button 
                onClick={checkoutHandler}
                className="w-full bg-white text-black py-4 uppercase tracking-widest font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
