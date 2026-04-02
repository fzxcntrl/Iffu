import React, { useEffect } from 'react';
import useAdminStore from '../store/useAdminStore';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const { stats, getAllOrders, getAllProducts, loading, error } = useAdminStore();

  useEffect(() => {
    getAllOrders();
    getAllProducts();
  }, [getAllOrders, getAllProducts]);

  return (
    <div className="flex bg-[rgb(var(--background))] text-white min-h-[calc(100vh-80px)]">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter mb-8">Dashboard Overview</h1>

        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
            <div className="bg-red-900/20 text-red-500 p-4 border border-red-900">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">Total Sales</h3>
              <p className="text-4xl font-mono">₹{stats.totalSales.toFixed(2)}</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">Total Orders</h3>
              <p className="text-4xl font-mono">{stats.totalOrders}</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">Total Products</h3>
              <p className="text-4xl font-mono">{stats.totalProducts}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
