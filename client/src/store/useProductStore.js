import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const useProductStore = create((set) => ({
  products: [],
  productDetails: null,
  loading: false,
  error: null,

  fetchProducts: async (keyword = '') => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/products?keyword=${keyword}`);
      set({ products: data, loading: false });
    } catch (error) {
      set({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        loading: false,
      });
    }
  },

  fetchProductDetails: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      set({ productDetails: data, loading: false });
    } catch (error) {
      set({
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        loading: false,
      });
    }
  },
}));

export default useProductStore;
