"use client";

import { useEffect } from "react";
import useCategoryStore from "@/hooks/useCategoryStore";
import useThemeStore from "@/hooks/useThemeStore";
import Header from "@/components/Header";
import Admin from "@/components/Admin";
import { Book } from "@/types/Book";
import useAdminStore from "@/hooks/useAdminStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import useBookStore from "@/hooks/useBookStore";
import Table from "@/components/Table";

export default function ReadingLog() {
    const { books, fetchBooks, syncBooks } = useBookStore();
    const { categories, setCategories } = useCategoryStore();
    const { isDarkMode } = useThemeStore();

    const { isAdmin, setIsAdmin } = useAdminStore();
    const { password, setPassword } = usePasswordStore();

    // 초기 데이터 로드
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    // 핸들러들
    const handleAddBook = async (bookData: {
        title: string;
        author: string;
        category: string;
        comment: string;
    }) => {
        const item: Book = {
            id: Date.now(),
            ...bookData,
            status: "읽는 중",
            readAt: [],
        };
        const updated = [item, ...books];
        await syncBooks(updated, categories, password);
    };

    const handleAddCategory = async (name: string) => {
        if (!name || categories.includes(name)) return;
        const updatedCats = [...categories, name];
        setCategories(updatedCats);
        await syncBooks(books, updatedCats, password);
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
                    <Table />
                </div>
            </div>
        </div>
    );
}
