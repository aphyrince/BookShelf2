import { create } from "zustand";

interface PASSWORD_STORE_TYPE {
    password: string;
    setPassword: (password: string) => void;
}

const usePasswordStore = create<PASSWORD_STORE_TYPE>((set) => ({
    password: "",
    setPassword: (password: string) => set({ password }),
}));

export default usePasswordStore;
