import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './useAuthStore';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const useAdminStore = create((set, get) => ({
  orders: [],
  products: [],
  loading: false,
  error: null,
  stats: {
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0
  },

  getAllOrders: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(`${API_URL}/orders`, config);
      
      const totalSales = data.reduce((acc, order) => acc + order.totalPrice, 0);
      
      set((state) => ({ 
        orders: data, 
        loading: false,
        stats: { ...state.stats, totalOrders: data.length, totalSales }
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  getAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      set((state) => ({ 
        products: data, 
        loading: false,
        stats: { ...state.stats, totalProducts: data.length }
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  createProduct: async (productData) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } };
      const { data } = await axios.post(`${API_URL}/products`, productData, config);
      set((state) => ({ products: [...state.products, data], loading: false }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return false;
    }
  },

  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } };
      const { data } = await axios.put(`${API_URL}/products/${id}`, productData, config);
      set((state) => ({ 
        products: state.products.map(p => p._id === id ? data : p), 
        loading: false 
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return false;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/products/${id}`, config);
      set((state) => ({ 
        products: state.products.filter(p => p._id !== id), 
        loading: false 
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return false;
    }
  },

  deliverOrder: async (id) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.put(`${API_URL}/orders/${id}/deliver`, {}, config);
      set((state) => ({
        orders: state.orders.map(o => o._id === id ? data : o),
        loading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
      return false;
    }
  }
}));

export default useAdminStore;
