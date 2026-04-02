import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ThankYou = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 border border-white/10 p-12 flex flex-col items-center"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tighter mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
          Thank you for shopping with Iffu. Your order has been placed successfully and is now being processed. You will receive an email confirmation shortly.
        </p>
        <Link 
          to="/shop" 
          className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;
