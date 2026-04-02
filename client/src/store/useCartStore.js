import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: 'Razorpay',

  addToCart: (product, qty) => {
    const item = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    };
    
    const existItem = get().cartItems.find((x) => x.product === item.product);

    if (existItem) {
      const newItems = get().cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
      set({ cartItems: newItems });
      localStorage.setItem('cartItems', JSON.stringify(newItems));
    } else {
      const newItems = [...get().cartItems, item];
      set({ cartItems: newItems });
      localStorage.setItem('cartItems', JSON.stringify(newItems));
    }
  },

  removeFromCart: (id) => {
    const newItems = get().cartItems.filter((x) => x.product !== id);
    set({ cartItems: newItems });
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  },

  saveShippingAddress: (data) => {
    set({ shippingAddress: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  },
}));

export default useCartStore;
