import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import useProductStore from '../store/useProductStore';
import useCartStore from '../store/useCartStore';
import useViewStore from '../store/useViewStore';
import RecommendationCarousel from '../components/RecommendationCarousel';

const dummyDetails = {
    _id: '1', name: 'Urban Monkey X Logo Hoodie', category: 'Hoodies', price: 2999, countInStock: 5, description: 'Premium heavyweight cotton hoodie featuring our signature x-logo embroidery. Oversized streetwear fit perfect for layering.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80'
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('L');
  
  const { productDetails, fetchProductDetails, loading, error } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProductDetails(id);
  }, [id, fetchProductDetails]);

  const product = productDetails || dummyDetails;

  useEffect(() => {
    if (productDetails) {
      useViewStore.getState().addViewedProduct(productDetails);
    }
  }, [productDetails]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title={product.name} description={product.description} image={product.image} />
      <button onClick={() => navigate(-1)} className="flex items-center text-sm uppercase tracking-widest text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Shop
      </button>

      {loading ? (
        <div className="flex justify-center h-64 items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 text-red-500 p-4 border border-red-900">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-12">
            <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2"
            >
            <div className="aspect-[3/4] bg-white/5 relative overflow-hidden">
                <img src={product.image} alt={product.name} loading="lazy" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            </motion.div>

            <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
            >
            <p className="text-gray-500 tracking-widest uppercase text-sm mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter mb-4">{product.name}</h1>
            <p className="text-2xl font-mono mb-8">₹{product.price}</p>
            
            <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
                {product.description}
            </p>

            <div className="mb-8">
                <h3 className="uppercase tracking-widest text-sm mb-3">Size</h3>
                <div className="flex gap-3 font-mono">
                {['S', 'M', 'L', 'XL'].map((s) => (
                    <button 
                    key={s} 
                    onClick={() => setSize(s)}
                    className={`w-12 h-12 border ${size === s ? 'border-white bg-white text-black' : 'border-white/20 hover:border-white/60'} transition-all flex items-center justify-center`}
                    >
                    {s}
                    </button>
                ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="uppercase tracking-widest text-sm mb-3">Quantity ({product.countInStock} in stock)</h3>
                <div className="flex border border-white/20 w-32 font-mono">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 hover:bg-white/10">-</button>
                <div className="flex-1 flex justify-center items-center">{qty}</div>
                <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="px-4 py-2 hover:bg-white/10">+</button>
                </div>
            </div>

            <button 
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`w-full py-5 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-colors ${
                product.countInStock > 0 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
            >
                <ShoppingBag className="w-5 h-5" />
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            </motion.div>
        </div>
      )}
      
      {!loading && !error && <RecommendationCarousel />}
    </div>
  );
};

export default ProductDetail;
