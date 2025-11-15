import { create } from 'zustand';

const useMatchStore = create((set) => ({
  matches: [],
  loading: false,
  error: null,
  
  // Set all matches
  setMatches: (matches) => set({ matches }),
  
  // Set loading state
  setLoading: (loading) => set({ loading }),
  
  // Set error state
  setError: (error) => set({ error }),
  
 
}));

export default useMatchStore;