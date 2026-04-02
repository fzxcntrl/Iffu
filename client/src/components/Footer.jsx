import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-[rgb(var(--foreground))]/10 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter uppercase font-heading">Iffu</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-sm">
              Premium streetwear for the modern era. Join the cult.
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Tiktok</a>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Iffu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
