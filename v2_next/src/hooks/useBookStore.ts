import { create } from "zustand";
import type { Book } from "@/types/Book";

interface BOOK_STORE_TYPE {
    books: Book[];
    setBooks: (books: Book[]) => void;
}

const useBookStore = create<BOOK_STORE_TYPE>((set) => ({
    books: [],
    setBooks: (books: Book[]) => set({ books }),
}));

export default useBookStore;
