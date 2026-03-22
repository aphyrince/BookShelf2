"use client";

import useThemeStore from "@/hooks/useThemeStore";
import { useState, useEffect, useCallback } from "react";

type BookStatus = "완료" | "읽는 중" | "포기함";

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    status: BookStatus;
    readAt: string[];
    comment: string;
}

export default function ReadingLog() {
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState<string[]>([
        "컴퓨터과학",
        "신경과학·건강",
        "자기계발",
        "인문학",
    ]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");
    const { isDarkMode, toggleTheme } = useThemeStore();
    const [isSyncing, setIsSyncing] = useState(false);

    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        category: "",
        comment: "",
    });
    const [newCatName, setNewCatName] = useState("");

    // 1. 초기 데이터 로드 (API 호출)
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
    }, []);

    // 2. 서버 싱크 함수 (Upstash Redis 저장)
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
                alert("데이터 저장 중 오류가 발생했습니다.");
            } finally {
                setIsSyncing(false);
            }
        },
        [isAdmin, password],
    );

    // 3. 관리자 로그인
    const handleLogin = () => {
        const input = prompt("관리자 암호를 입력하세요.");
        if (input) {
            setPassword(input);
            setIsAdmin(true);
        }
    };

    // 4. 데이터 조작 핸들러
    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBook.title) return;
        const item: Book = {
            id: Date.now(),
            ...newBook,
            category: newBook.category || categories[0],
            status: "읽는 중",
            readAt: [],
        };
        const updated = [item, ...books];
        setBooks(updated);
        setNewBook({
            title: "",
            author: "",
            category: categories[0],
            comment: "",
        });
        await syncWithServer(updated, categories);
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

    const deleteBook = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const updated = books.filter((b) => b.id !== id);
        setBooks(updated);
        await syncWithServer(updated, categories);
    };

    const handleAddCategory = async () => {
        if (!newCatName || categories.includes(newCatName)) return;
        const updatedCats = [...categories, newCatName];
        setCategories(updatedCats);
        setNewCatName("");
        await syncWithServer(books, updatedCats);
    };

    return (
        <div
            className={`${isDarkMode ? "dark bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"} min-h-screen transition-colors p-4 md:p-8 font-sans`}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10 border-b pb-4 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-black italic tracking-tighter">
                            안정호의 책장
                        </h1>
                        {isSyncing && (
                            <span className="text-[10px] animate-pulse text-blue-500 font-bold uppercase">
                                Saving...
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2 border rounded-xl bg-white dark:bg-slate-800 dark:border-slate-600 text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
                        </button>
                        <button
                            onClick={
                                isAdmin
                                    ? () => {
                                          setIsAdmin(false);
                                          setPassword("");
                                      }
                                    : handleLogin
                            }
                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition shadow-sm ${
                                isAdmin
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                            }`}
                        >
                            {isAdmin ? "LOGOUT" : "ADMIN LOGIN"}
                        </button>
                    </div>
                </header>

                {/* Admin Section */}
                {isAdmin && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-top-2 duration-300">
                        <form
                            onSubmit={handleAddBook}
                            className="lg:col-span-3 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
                        >
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Add New Archive
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    placeholder="Title"
                                    value={newBook.title}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            title: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 ring-blue-500 transition text-slate-900 dark:text-white"
                                />
                                <input
                                    placeholder="Author"
                                    value={newBook.author}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            author: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 ring-blue-500 transition text-slate-900 dark:text-white"
                                />
                                <select
                                    value={newBook.category}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            category: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white"
                                >
                                    {categories.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    placeholder="Short Comment"
                                    value={newBook.comment}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            comment: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 ring-blue-500 transition text-slate-900 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                            >
                                Update Database
                            </button>
                        </form>

                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                Tag Management
                            </h3>
                            <div className="flex gap-2 mb-4">
                                <input
                                    placeholder="New Tag"
                                    value={newCatName}
                                    onChange={(e) =>
                                        setNewCatName(e.target.value)
                                    }
                                    className="flex-1 p-2 text-xs rounded-lg border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white"
                                />
                                <button
                                    onClick={handleAddCategory}
                                    className="px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-black rounded-lg text-xs font-bold"
                                >
                                    ADD
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 overflow-y-auto max-h-32 scrollbar-hide">
                                {categories.map((cat) => (
                                    <span
                                        key={cat}
                                        className="flex items-center gap-1 px-2 py-1 bg-slate-50 dark:bg-slate-700 text-[10px] rounded-md border border-slate-100 dark:border-slate-600 text-slate-500 dark:text-slate-300"
                                    >
                                        {cat}
                                        <button
                                            onClick={() =>
                                                setCategories(
                                                    categories.filter(
                                                        (c) => c !== cat,
                                                    ),
                                                )
                                            }
                                            className="hover:text-red-500 font-bold ml-1"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Data List */}
                <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-4xl shadow-sm bg-white dark:bg-slate-900 transition-colors">
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
                                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors group"
                                >
                                    <td className="p-5 align-top">
                                        <div className="font-bold text-slate-800 dark:text-slate-100 truncate text-sm">
                                            {book.title}
                                        </div>
                                        <div className="text-[11px] text-slate-400 mt-1">
                                            {book.author || "N/A"}
                                        </div>
                                    </td>
                                    <td className="p-5 align-top text-center">
                                        <span className="inline-block px-2 py-1 rounded-lg text-[9px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 border border-blue-100/50 dark:border-blue-800/50">
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
                                                className="text-[11px] p-1 bg-white dark:bg-slate-900 border rounded-lg border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
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
                                            <div className="text-base leading-none tracking-tighter">
                                                {book.status === "완료"
                                                    ? book.readAt.length > 0
                                                        ? book.readAt
                                                              .map(() => "🟢")
                                                              .join("")
                                                        : "🟢"
                                                    : book.status === "읽는 중"
                                                      ? "🟠"
                                                      : "🔴"}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-5 align-top">
                                        <div className="max-h-20 overflow-y-auto space-y-1.5 scrollbar-hide pr-2">
                                            {book.readAt.map((date, i) => (
                                                <div
                                                    key={i}
                                                    className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between group/date"
                                                >
                                                    <span>{date}</span>
                                                    {isAdmin && (
                                                        <button
                                                            onClick={() =>
                                                                setBooks(
                                                                    books.map(
                                                                        (b) =>
                                                                            b.id ===
                                                                            book.id
                                                                                ? {
                                                                                      ...b,
                                                                                      readAt: b.readAt.filter(
                                                                                          (
                                                                                              _,
                                                                                              idx,
                                                                                          ) =>
                                                                                              idx !==
                                                                                              i,
                                                                                      ),
                                                                                  }
                                                                                : b,
                                                                    ),
                                                                )
                                                            }
                                                            className="text-red-400 opacity-0 group-hover/date:opacity-100"
                                                        >
                                                            ×
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {isAdmin && (
                                                <button
                                                    onClick={() =>
                                                        addReadDate(book.id)
                                                    }
                                                    className="w-full mt-2 text-[10px] text-slate-400 hover:text-blue-500 border border-slate-200 dark:border-slate-700 border-dashed py-1 rounded-lg transition"
                                                >
                                                    + Log Date
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-5 align-top">
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-3 leading-relaxed">
                                            {book.comment || "-"}
                                        </p>
                                    </td>
                                    {isAdmin && (
                                        <td className="p-5 align-top text-center">
                                            <button
                                                onClick={() =>
                                                    deleteBook(book.id)
                                                }
                                                className="text-slate-200 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {books.length === 0 && (
                        <div className="py-32 text-center text-slate-300 text-xs tracking-[0.3em] uppercase italic">
                            The shelf is empty
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
