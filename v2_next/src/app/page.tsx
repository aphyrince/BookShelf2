"use client";

import { useEffect, useCallback } from "react";
import useCategoryStore from "@/hooks/useCategoryStore";
import useThemeStore from "@/hooks/useThemeStore";
import Header from "@/components/Header";
import Admin from "@/components/Admin";
import { Book } from "@/types/Book";
import { BookStatus } from "@/types/Status";
import useAdminStore from "@/hooks/useAdminStore";
import useSyncStore from "@/hooks/useSyncStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import useBookStore from "@/hooks/useBookStore";
import Table from "@/components/Table";

export default function ReadingLog() {
    const { books, setBooks } = useBookStore();
    const { categories, setCategories } = useCategoryStore();
    const { isDarkMode } = useThemeStore();

    const { isAdmin, setIsAdmin } = useAdminStore();
    const { password, setPassword } = usePasswordStore();
    const { setIsSyncing } = useSyncStore();

    // 초기 데이터 로드
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/data");
                const json = await res.json();
                if (json.books) setBooks(json.books);
                if (json.categories) setCategories(json.categories);
            } catch (e) {
                console.error("데이터 로드 실패", e);
            }
        };
        fetchData();
    }, [setCategories, setBooks]);

    // 서버 동기화
    const syncWithServer = useCallback(
        async (updatedBooks: Book[], updatedCats: string[]) => {
            if (!isAdmin) return;
            setIsSyncing(true);
            try {
                const res = await fetch("/api/data", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        password: password,
                        data: { books: updatedBooks, categories: updatedCats },
                    }),
                });
                if (!res.ok) throw new Error("저장 실패");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                alert("데이터 저장 중 오류 발생");
            } finally {
                setIsSyncing(false);
            }
        },
        [isAdmin, password, setIsSyncing],
    );

    // 핸들러들
    const handleAddBook = async (
        bookData: Omit<Book, "id" | "status" | "readAt">,
    ) => {
        const item: Book = {
            id: Date.now(),
            ...bookData,
            status: "읽는 중",
            readAt: [],
        };
        const updated = [item, ...books];
        setBooks(updated);
        await syncWithServer(updated, categories);
    };

    const handleAddCategory = async (name: string) => {
        if (!name || categories.includes(name)) return;
        const updatedCats = [...categories, name];
        setCategories(updatedCats);
        await syncWithServer(books, updatedCats);
    };

    const updateStatus = async (id: number, status: BookStatus) => {
        const updated = books.map((b) => (b.id === id ? { ...b, status } : b));
        setBooks(updated);
        await syncWithServer(updated, categories);
    };

    const addReadDate = async (id: number) => {
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
        setBooks(updated);
        await syncWithServer(updated, categories);
    };

    return (
        <div
            className={`${isDarkMode ? "dark bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"} min-h-screen p-4 md:p-8 transition-colors`}
        >
            <div className="max-w-7xl mx-auto">
                <Header
                    onLogin={() => {
                        const input = prompt("비밀번호 입력");
                        if (input) {
                            setPassword(input);
                            setIsAdmin(true);
                        }
                    }}
                    onLogout={() => {
                        setIsAdmin(false);
                        setPassword("");
                    }}
                />

                {isAdmin && (
                    <Admin
                        onAddBook={handleAddBook}
                        onAddCategory={handleAddCategory}
                    />
                )}

                {/* 도서 목록 테이블 */}
                <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-4xl bg-white dark:bg-slate-900 shadow-sm">
                    <Table
                        addReadDate={addReadDate}
                        syncWithServer={syncWithServer}
                        updateStatus={updateStatus}
                    />
                </div>
            </div>
        </div>
    );
}
