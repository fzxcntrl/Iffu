import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/useProductStore';
import SEO from '../components/SEO';

const sampleProducts = [
  { _id: '1', name: 'Urban Monkey X Logo Hoodie', category: 'Hoodies', price: 2999, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80' },
  { _id: '2', name: 'Oversized Washed Tee', category: 'Tees', price: 1499, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80' },
  { _id: '3', name: 'Essential Snapback', category: 'Caps', price: 999, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80' },
  { _id: '4', name: 'Utility Cargo Pants', category: 'Bottoms', price: 3499, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80' },
];

const Shop = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Use backend products if available, else use fallback sample
  const displayProducts = products.length > 0 ? products : sampleProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SEO title="Shop Collection" description="Browse our entire collection of streetwear hoodies, tees, and caps." />
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[rgb(var(--foreground))]/10 pb-8">
        <div>
          <h1 className="text-5xl font-heading font-bold uppercase tracking-tighter">Shop</h1>
          <p className="text-gray-400 mt-2">Showing all {displayProducts.length} results</p>
        </div>
        <div className="flex flex-col items-end gap-4 mt-6 md:mt-0 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white/5 border border-white/20 py-2 px-4 text-sm font-mono focus:outline-none focus:border-white transition-colors"
            />
            <div className="absolute right-3 top-2.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
          <div className="flex space-x-4 font-mono text-sm overflow-x-auto pb-2 w-full md:w-auto">
            <button className="border-b border-white pb-1 whitespace-nowrap">All</button>
            <button className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">Hoodies</button>
            <button className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">Tees</button>
            <button className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">Caps</button>
            <button className="text-gray-500 hover:text-white transition-colors whitespace-nowrap">Bottoms</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center h-64 items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 text-red-500 p-4 border border-red-900">{error}</div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {displayProducts.map((product) => (
             <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Shop;
