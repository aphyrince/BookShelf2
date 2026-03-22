import { create } from "zustand";

interface ADMIN_STORE_TYPE {
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}

const useAdminStore = create<ADMIN_STORE_TYPE>((set) => ({
    isAdmin: false,
    setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
}));

export default useAdminStore;
