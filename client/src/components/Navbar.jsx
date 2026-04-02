import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import useThemeStore from '../store/useThemeStore';

const Navbar = () => {
  const { cartItems } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full bg-[rgb(var(--background))]/80 backdrop-blur-md border-b border-[rgb(var(--foreground))]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-3xl font-bold tracking-tighter uppercase font-heading">
              Iffu
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest">
            <Link to="/shop" className="hover:text-gray-400 transition-colors duration-200">Shop All</Link>
            <Link to="/category/hoodies" className="hover:text-gray-400 transition-colors duration-200">Hoodies</Link>
            <Link to="/category/tees" className="hover:text-gray-400 transition-colors duration-200">Tees</Link>
            <Link to="/category/caps" className="hover:text-gray-400 transition-colors duration-200">Caps</Link>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="hover:text-gray-400 transition-colors duration-200">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="hover:text-gray-400 transition-colors duration-200">
              <Search size={20} />
            </button>
            <Link to="/login" className="hover:text-gray-400 transition-colors duration-200">
              <User size={20} />
            </Link>
            <Link to="/cart" className="relative hover:text-gray-400 transition-colors duration-200">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
