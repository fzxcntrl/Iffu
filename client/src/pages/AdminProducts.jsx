import React, { useEffect, useState } from 'react';
import useAdminStore from '../store/useAdminStore';
import AdminSidebar from '../components/AdminSidebar';
import { Trash2, Edit, Plus } from 'lucide-react';

const AdminProducts = () => {
  const { products, getAllProducts, deleteProduct, createProduct, loading, error } = useAdminStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      const dummyData = {
        name: 'Sample name',
        price: 0,
        image: '/images/sample.jpg',
        category: 'Sample category',
        countInStock: 0,
        description: 'Sample description',
      };
      await createProduct(dummyData);
      getAllProducts(); // refresh
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="flex bg-[rgb(var(--background))] text-white min-h-[calc(100vh-80px)]">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter">Products</h1>
          <button 
            onClick={createProductHandler}
            className="bg-white text-black px-6 py-2 flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors"
          >
            <Plus size={18} /> Create Product
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
            <div className="bg-red-900/20 text-red-500 p-4 border border-red-900">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20 text-xs uppercase tracking-widest text-gray-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs">{product._id}</td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4 font-mono">₹{product.price}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">{product.brand || 'Iffu'}</td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded transition-colors">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
