import { create } from 'zustand';

interface State {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useSearchStore = create<State>()((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
