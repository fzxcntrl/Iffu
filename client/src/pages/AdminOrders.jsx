import React, { useEffect } from 'react';
import useAdminStore from '../store/useAdminStore';
import AdminSidebar from '../components/AdminSidebar';
import { User, CheckCircle, XCircle, Truck } from 'lucide-react';

const AdminOrders = () => {
  const { orders, getAllOrders, deliverOrder, loading, error } = useAdminStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const deliverHandler = async (id) => {
    if (window.confirm('Mark this order as delivered?')) {
      await deliverOrder(id);
    }
  };

  return (
    <div className="flex bg-[rgb(var(--background))] text-white min-h-[calc(100vh-80px)]">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tighter mb-8 border-b border-white/10 pb-4">Orders</h1>

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
                  <th className="p-4">User</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4 text-center">Paid</th>
                  <th className="p-4 text-center">Delivered</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs">{order._id.substring(0, 10)}...</td>
                    <td className="p-4 flex items-center gap-2">
                       <User size={16} className="text-gray-400"/>
                       {order.user?.name || 'Anonymous'}
                    </td>
                    <td className="p-4 font-mono text-sm">{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                    <td className="p-4 font-mono font-bold">₹{order.totalPrice}</td>
                    <td className="p-4 text-center">
                      {order.isPaid ? (
                        <CheckCircle size={18} className="text-green-500 mx-auto" />
                      ) : (
                        <XCircle size={18} className="text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {order.isDelivered ? (
                        <span className="font-mono text-xs text-green-500">{order.deliveredAt.substring(0, 10)}</span>
                      ) : (
                        <XCircle size={18} className="text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-right">
                       {!order.isDelivered && (
                          <button 
                            onClick={() => deliverHandler(order._id)}
                            className="bg-white text-black px-3 py-1 text-xs uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 ml-auto"
                          >
                           <Truck size={14}/> Ship
                          </button>
                       )}
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

export default AdminOrders;
