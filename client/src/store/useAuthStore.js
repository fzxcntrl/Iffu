import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const useAuthStore = create((set) => ({
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  error: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        config
      );
      set({ userInfo: data, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
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

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        `${API_URL}/auth/register`,
        { name, email, password },
        config
      );
      set({ userInfo: data, loading: false });
      localStorage.setItem('userInfo', JSON.stringify(data));
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

  logout: () => {
    localStorage.removeItem('userInfo');
    set({ userInfo: null });
  },
}));

export default useAuthStore;
