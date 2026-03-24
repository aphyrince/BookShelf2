import { create } from "zustand";
import type { Book } from "@/types/Book";
import { BookStatus } from "@/types/Status";

interface BOOK_STORE_TYPE {
    books: Book[];
    fetchBooks: () => Promise<void>;
    // 개별 액션으로 분리하여 가독성과 유지보수성 향상
    updateBookStatus: (
        id: number,
        status: BookStatus,
        categories: string[],
        password: string,
    ) => Promise<void>;
    addBookReadDate: (
        id: number,
        categories: string[],
        password: string,
    ) => Promise<void>;
    deleteBook: (
        id: number,
        categories: string[],
        password: string,
    ) => Promise<void>;
    syncBooks: (
        updatedBooks: Book[],
        categories: string[],
        password: string,
    ) => Promise<void>;
}

const useBookStore = create<BOOK_STORE_TYPE>((set, get) => ({
    books: [],

    fetchBooks: async () => {
        try {
            const res = await fetch("/api/data");
            const json = await res.json();
            if (json.books) set({ books: json.books });
        } catch (error) {
            console.error("데이터 로드 실패", error);
        }
    },

    // 상태 업데이트 로직 통합
    updateBookStatus: async (id, status, categories, password) => {
        const { books, syncBooks } = get();
        const updated = books.map((b) => (b.id === id ? { ...b, status } : b));
        await syncBooks(updated, categories, password);
    },

    addBookReadDate: async (id, categories, password) => {
        const { books, syncBooks } = get();
        const today = new Date().toLocaleDateString();
        const updated = books.map((b) =>
            b.id === id
                ? {
                      ...b,
                      status: "완료" as const,
                      readAt: [...b.readAt, today],
                  }
                : b,
        );
        await syncBooks(updated, categories, password);
    },

    deleteBook: async (id, categories, password) => {
        const { books, syncBooks } = get();
        const updated = books.filter((b) => b.id !== id);
        await syncBooks(updated, categories, password);
    },

    syncBooks: async (updatedBooks, categories, password) => {
        try {
            const res = await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password,
                    data: { books: updatedBooks, categories },
                }),
            });
            if (!res.ok) throw new Error("저장 실패");
            set({ books: updatedBooks });
        } catch (error) {
            alert("데이터 저장 중 오류 발생");
            throw error;
        }
    },
}));

export default useBookStore;
