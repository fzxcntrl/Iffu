import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="w-full">
      <SEO title="Home" />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[rgb(var(--background))]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgb(var(--background))] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold font-heading uppercase tracking-tighter"
          >
            Define Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Identity</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Premium streetwear designed for those who refuse to blend in. Discover the latest collection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10"
          >
            <Link to="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white uppercase tracking-widest bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300">
              <span>Explore Collection</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-4 border-y border-[rgb(var(--foreground))]/10 overflow-hidden bg-black flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex space-x-8 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-2xl font-bold uppercase tracking-widest text-transparent paint-stroke px-8 outline-text" style={{ WebkitTextStroke: '1px white' }}>
              NEW ARRIVALS • FREE SHIPPING • 
            </span>
          ))}
        </motion.div>
      </div>

      {/* Featured Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-heading font-bold uppercase tracking-tighter mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80' },
            { title: 'Tees', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80' },
            { title: 'Caps', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80' }
          ].map((cat, idx) => (
            <Link to={`/category/${cat.title.toLowerCase()}`} key={idx} className="group relative h-[400px] overflow-hidden bg-white/5 border border-white/10 block">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3 className="text-3xl font-heading font-bold uppercase tracking-widest bg-black/50 px-6 py-3 border border-white/20 backdrop-blur-sm">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Container */}
      <section className="py-24 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
            <h2 className="text-4xl font-heading font-bold uppercase tracking-tighter">Featured Drops</h2>
            <Link to="/shop" className="text-sm font-mono tracking-widest uppercase hover:text-white text-gray-400">View All →</Link>
          </div>
          {/* Note: In a real app, you'd fetch these from the backend and use the ProductCard component. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative flex flex-col gap-4">
                <Link to="/shop" className="block relative overflow-hidden bg-white/5 aspect-[3/4]">
                  <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80" alt="Placeholder" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                </Link>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading font-medium text-lg tracking-wide uppercase"><Link to="/shop">Exclusive Item {item}</Link></h3>
                    <p className="text-gray-500 text-sm">Category</p>
                  </div>
                  <p className="font-mono font-medium">₹1499</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
