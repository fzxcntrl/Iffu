import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'dark',

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    
    // update the dom class directly
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),

  initTheme: () => set((state) => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: state.theme };
  })
}));

export default useThemeStore;
