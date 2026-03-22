"use client";

import { useState, useEffect, useCallback } from "react";
import useCategoryStore from "@/hooks/useCategoryStore";
import useThemeStore from "@/hooks/useThemeStore";
import Header from "@/components/Header";
import Admin from "@/components/Admin";
import { Book } from "@/types/Book";
import { BookStatus } from "@/types/Status";

export default function ReadingLog() {
    const [books, setBooks] = useState<Book[]>([]);
    const { categories, setCategories } = useCategoryStore();
    const { isDarkMode } = useThemeStore();

    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);

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
    }, [setCategories]);

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
        [isAdmin, password],
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
                    isAdmin={isAdmin}
                    isSyncing={isSyncing}
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
                    <table className="w-full text-left table-fixed border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="p-5 w-[30%]">
                                    Item Information
                                </th>
                                <th className="p-5 w-[15%] text-center">
                                    Category
                                </th>
                                <th className="p-5 w-[15%] text-center">
                                    Status
                                </th>
                                <th className="p-5 w-[20%]">Read History</th>
                                <th className="p-5 w-[20%]">Feedback</th>
                                {isAdmin && <th className="p-5 w-15"></th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {books.map((book) => (
                                <tr
                                    key={book.id}
                                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 group"
                                >
                                    <td className="p-5 align-top">
                                        <div className="font-bold text-sm truncate">
                                            {book.title}
                                        </div>
                                        <div className="text-[11px] text-slate-400 mt-1">
                                            {book.author || "N/A"}
                                        </div>
                                    </td>
                                    <td className="p-5 align-top text-center">
                                        <span className="inline-block px-2 py-1 rounded-lg text-[9px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-500 border border-blue-100/50">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className="p-5 align-top text-center">
                                        {isAdmin ? (
                                            <select
                                                value={book.status}
                                                onChange={(e) =>
                                                    updateStatus(
                                                        book.id,
                                                        e.target
                                                            .value as BookStatus,
                                                    )
                                                }
                                                className="text-[11px] bg-transparent border border-slate-200 dark:border-slate-700 rounded p-1"
                                            >
                                                <option value="읽는 중">
                                                    🟠 읽는 중
                                                </option>
                                                <option value="완료">
                                                    🟢 완료
                                                </option>
                                                <option value="포기함">
                                                    🔴 포기함
                                                </option>
                                            </select>
                                        ) : (
                                            <span>
                                                {book.status === "완료"
                                                    ? "🟢"
                                                    : book.status === "읽는 중"
                                                      ? "🟠"
                                                      : "🔴"}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-5 align-top">
                                        <div className="text-[10px] space-y-1">
                                            {book.readAt.map((d, i) => (
                                                <div key={i}>{d}</div>
                                            ))}
                                            {isAdmin && (
                                                <button
                                                    onClick={() =>
                                                        addReadDate(book.id)
                                                    }
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    + Log
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-5 align-top">
                                        <p className="text-[11px] text-slate-500 italic line-clamp-3">
                                            {book.comment || "-"}
                                        </p>
                                    </td>
                                    {isAdmin && (
                                        <td className="p-5 align-top">
                                            <button
                                                onClick={() => {
                                                    if (confirm("삭제?")) {
                                                        const updated =
                                                            books.filter(
                                                                (b) =>
                                                                    b.id !==
                                                                    book.id,
                                                            );
                                                        setBooks(updated);
                                                        syncWithServer(
                                                            updated,
                                                            categories,
                                                        );
                                                    }
                                                }}
                                                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
