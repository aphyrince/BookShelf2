import { create } from 'zustand';

interface ThemeState {
    darkTheme: boolean;
}

export const useThemeStore = create<ThemeState>()(() => ({
    darkTheme: false,
}));

export function toggleTheme() {
    useThemeStore.setState((prev) => ({ darkTheme: !prev.darkTheme }));
}
