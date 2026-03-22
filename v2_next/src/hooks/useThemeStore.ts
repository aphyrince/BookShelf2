import { create } from "zustand";

interface THEME_STORE_TYPE {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const useThemeStore = create<THEME_STORE_TYPE>((set) => ({
    isDarkMode: false,
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useThemeStore;
