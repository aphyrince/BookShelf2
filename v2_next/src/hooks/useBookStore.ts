import { create } from "zustand";
import type { Book } from "@/types/Book";

interface BOOK_STORE_TYPE {
    books: Book[];
    setBooks: (books: Book[]) => void;
    fetchBooks: () => Promise<void>;
    syncBooks: (
        updatedBooks: Book[],
        categories: string[],
        password: string,
    ) => Promise<void>;
}

const useBookStore = create<BOOK_STORE_TYPE>((set) => ({
    books: [],
    setBooks: (books) => set({ books }),
    fetchBooks: async () => {
        try {
            const res = await fetch("/api/data");
            const json = await res.json();
            if (json.books) set({ books: json.books });
        } catch (error) {
            console.error("데이터 로드 실패", error);
        }
    },
    syncBooks: async (updatedBooks, categories, password) => {
        try {
            const res = await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: password,
                    data: { books: updatedBooks, categories: categories },
                }),
            });
            if (!res.ok) throw new Error("저장 실패");
            set({ books: updatedBooks }); // 서버 저장 성공 후 상태 업데이트
        } catch (error) {
            alert("데이터 저장 중 오류 발생");
            throw error;
        }
    },
}));

export default useBookStore;
