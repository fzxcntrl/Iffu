import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white/5 border-r border-white/10 min-h-[calc(100vh-80px)] p-6">
      <h2 className="text-xl font-heading font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Admin Panel</h2>
      
      <nav className="flex flex-col gap-2">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded text-sm uppercase tracking-widest font-bold transition-colors ${isActive ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`
          }
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </NavLink>
        
        <NavLink 
          to="/admin/products" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded text-sm uppercase tracking-widest font-bold transition-colors ${isActive ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`
          }
        >
          <Package className="w-5 h-5" /> Products
        </NavLink>

        <NavLink 
          to="/admin/orders" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded text-sm uppercase tracking-widest font-bold transition-colors ${isActive ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`
          }
        >
          <ShoppingCart className="w-5 h-5" /> Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
