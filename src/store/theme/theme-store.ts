import { create } from 'zustand';

export interface ThemeStoreState {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStoreState>()((set) => ({
  isDarkMode: false,
  setIsDarkMode: (value) => {
    set({ isDarkMode: value });
  },
}));
