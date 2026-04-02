import { create } from 'zustand';

const useViewStore = create((set, get) => ({
  recentlyViewed: localStorage.getItem('recentlyViewed')
    ? JSON.parse(localStorage.getItem('recentlyViewed'))
    : [],

  addViewedProduct: (product) => {
    let currentViews = [...get().recentlyViewed];
    
    // Remove if exists to push to front
    currentViews = currentViews.filter(p => p._id !== product._id);
    
    // Add to front
    currentViews.unshift(product);
    
    // Keep max 10
    if (currentViews.length > 10) {
      currentViews.pop();
    }
    
    set({ recentlyViewed: currentViews });
    localStorage.setItem('recentlyViewed', JSON.stringify(currentViews));
  },
  
  clearViews: () => {
    set({ recentlyViewed: [] });
    localStorage.removeItem('recentlyViewed');
  }
}));

export default useViewStore;
