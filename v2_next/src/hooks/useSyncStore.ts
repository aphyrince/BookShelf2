import { create } from "zustand";

interface SYNC_STORE_TYPE {
    isSyncing: boolean;
    setIsSyncing: (isSyncing: boolean) => void;
}

const useSyncStore = create<SYNC_STORE_TYPE>((set) => ({
    isSyncing: false,
    setIsSyncing: (isSyncing: boolean) => set({ isSyncing }),
}));

export default useSyncStore;
