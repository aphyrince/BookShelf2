import { create } from "zustand";

type CATEGORY_TYPE = string;

interface CATEGORY_STORE_TYPE {
    categories: CATEGORY_TYPE[];
    setCategories: (items: CATEGORY_TYPE[]) => void;
    addCategory: (item: CATEGORY_TYPE) => void;
    delCategory: (item: CATEGORY_TYPE) => void;
}

const useCategoryStore = create<CATEGORY_STORE_TYPE>((set) => ({
    categories: ["컴퓨터과학", "신경과학·건강", "자기계발", "인문학"],
    setCategories: (items: CATEGORY_TYPE[]) => set({ categories: items }),
    addCategory: (item: CATEGORY_TYPE) =>
        set((state) => ({
            categories: [...state.categories, item],
        })),
    delCategory: (item: CATEGORY_TYPE) =>
        set((state) => ({
            categories: [...state.categories.filter((elem) => elem !== item)],
        })),
}));

export default useCategoryStore;
