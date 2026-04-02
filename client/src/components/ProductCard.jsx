import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col gap-4"
    >
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden bg-white/5 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-bold tracking-widest uppercase text-sm border border-white px-6 py-3">View Details</span>
        </div>
      </Link>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-heading font-medium text-lg tracking-wide uppercase">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h3>
          <p className="text-gray-500 text-sm">{product.category}</p>
        </div>
        <p className="font-mono font-medium">₹{product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
