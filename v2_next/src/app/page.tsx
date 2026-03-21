"use client";

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
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        category: "",
        comment: "",
    });
    const [newCatName, setNewCatName] = useState("");

    // 1. 초기 데이터 로드 (Vercel KV -> Client)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/data");
                const json = await res.json();
                if (json.books) setBooks(json.books);
                if (json.categories) setCategories(json.categories);
            } catch (e) {
                console.error("데이터를 불러오지 못했습니다.", e);
            }
        };
        fetchData();
    }, []);

    // 2. 서버 저장 로직 (API 호출)
    const syncWithServer = useCallback(
        async (updatedBooks: Book[], updatedCats: string[]) => {
            if (!isAdmin) return;
            try {
                await fetch("/api/data", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        password: password,
                        data: { books: updatedBooks, categories: updatedCats },
                    }),
                });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                alert("서버 저장에 실패했습니다.");
            }
        },
        [isAdmin, password],
    );

    // 3. 관리자 로그인 처리
    const handleLogin = () => {
        const input = prompt("관리자 암호를 입력하세요.");
        if (input) {
            setPassword(input);
            setIsAdmin(true);
        }
    };

    // 4. 데이터 조작 함수들 (호출 시마다 서버 싱크)
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
        if (!confirm("삭제하시겠습니까?")) return;
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
                {/* 상단바 */}
                <header className="flex justify-between items-center mb-10 border-b pb-4 dark:border-slate-700">
                    <h1 className="text-2xl font-black italic tracking-tighter">
                        READING.LOG
                    </h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 border rounded-xl bg-white dark:bg-slate-800 dark:border-slate-600 text-sm"
                        >
                            {isDarkMode ? "🌙 Dark" : "☀️ Light"}
                        </button>
                        <button
                            onClick={
                                isAdmin ? () => setIsAdmin(false) : handleLogin
                            }
                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                                isAdmin
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                            }`}
                        >
                            {isAdmin ? "ADMIN EXIT" : "ADMIN LOGIN"}
                        </button>
                    </div>
                </header>

                {/* 관리자 컨트롤 (추가/카테고리) */}
                {isAdmin && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in duration-500">
                        <form
                            onSubmit={handleAddBook}
                            className="lg:col-span-3 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 text-slate-900 dark:text-white"
                        >
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Add Record
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    placeholder="도서명"
                                    value={newBook.title}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            title: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-600 outline-none focus:ring-2 ring-blue-500 text-slate-900 dark:text-white"
                                />
                                <input
                                    placeholder="저자명"
                                    value={newBook.author}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            author: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-600 outline-none focus:ring-2 ring-blue-500 text-slate-900 dark:text-white"
                                />
                                <select
                                    value={newBook.category}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            category: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-600 text-slate-900 dark:text-white"
                                >
                                    {categories.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    placeholder="한줄평"
                                    value={newBook.comment}
                                    onChange={(e) =>
                                        setNewBook({
                                            ...newBook,
                                            comment: e.target.value,
                                        })
                                    }
                                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-900 dark:border-slate-600 outline-none focus:ring-2 ring-blue-500 text-slate-900 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                            >
                                데이터베이스 동기화
                            </button>
                        </form>

                        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                Category Edit
                            </h3>
                            <div className="flex gap-2 mb-4">
                                <input
                                    placeholder="태그"
                                    value={newCatName}
                                    onChange={(e) =>
                                        setNewCatName(e.target.value)
                                    }
                                    className="flex-1 p-2 text-xs rounded-lg border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-600 text-slate-900 dark:text-white"
                                />
                                <button
                                    onClick={handleAddCategory}
                                    className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-lg text-xs font-bold"
                                >
                                    ADD
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 overflow-y-auto max-h-32">
                                {categories.map((cat) => (
                                    <span
                                        key={cat}
                                        className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-[10px] rounded-md border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300"
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

                {/* 독서 아카이브 리스트 */}
                <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm bg-white dark:bg-slate-900 transition-colors">
                    <table className="w-full text-left table-fixed border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="p-4 w-[30%]">Information</th>
                                <th className="p-4 w-[15%] text-center">Tag</th>
                                <th className="p-4 w-[15%] text-center">
                                    Status
                                </th>
                                <th className="p-4 w-[20%]">Read Dates</th>
                                <th className="p-4 w-[20%]">Feedback</th>
                                {isAdmin && <th className="p-4 w-15"></th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {books.map((book) => (
                                <tr
                                    key={book.id}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                                >
                                    <td className="p-4 align-top">
                                        <div className="font-bold text-slate-800 dark:text-slate-100 truncate">
                                            {book.title}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">
                                            {book.author}
                                        </div>
                                    </td>
                                    <td className="p-4 align-top text-center">
                                        <span className="inline-block px-2 py-1 rounded-lg text-[9px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                            {book.category}
                                        </span>
                                    </td>
                                    <td className="p-4 align-top text-center">
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
                                                className="text-xs p-1 bg-white dark:bg-slate-900 border rounded border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
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
                                            <div className="text-lg leading-none">
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
                                    <td className="p-4 align-top">
                                        <div className="max-h-20 overflow-y-auto space-y-1.5 scrollbar-hide pr-2">
                                            {book.readAt.map((date, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400"
                                                >
                                                    <span>{date}</span>
                                                </div>
                                            ))}
                                            {isAdmin && (
                                                <button
                                                    onClick={() =>
                                                        addReadDate(book.id)
                                                    }
                                                    className="w-full mt-2 text-[10px] text-slate-400 hover:text-blue-500 border border-slate-200 dark:border-slate-700 border-dashed py-1 rounded transition"
                                                >
                                                    + 추가
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 align-top">
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-3 leading-relaxed">
                                            {book.comment || "-"}
                                        </p>
                                    </td>
                                    {isAdmin && (
                                        <td className="p-4 align-top text-center">
                                            <button
                                                onClick={() =>
                                                    deleteBook(book.id)
                                                }
                                                className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
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
                        <div className="py-32 text-center text-slate-300 text-xs tracking-[0.2em] uppercase italic">
                            The shelf is empty
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
