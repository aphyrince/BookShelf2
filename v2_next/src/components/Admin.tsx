"use client";

import React, { useState } from "react";
import { Book } from "@/types/Book";
import useCategoryStore from "@/hooks/useCategoryStore";
import useBookStore from "@/hooks/useBookStore";
import usePasswordStore from "@/hooks/usePasswordStore";

function Admin() {
    const { categories, setCategories } = useCategoryStore();
    const { books, syncBooks } = useBookStore();
    const { password } = usePasswordStore();
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        category: categories[0] || "",
        comment: "",
    });
    const [newCatName, setNewCatName] = useState("");

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

    const handleSubmitBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBook.title) return;
        handleAddBook(newBook);
        setNewBook({ ...newBook, title: "", author: "", comment: "" });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* 도서 추가 폼 */}
            <form
                onSubmit={handleSubmitBook}
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
                            setNewBook({ ...newBook, title: e.target.value })
                        }
                        className="p-3 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 ring-blue-500 transition text-slate-900 dark:text-white"
                    />
                    <input
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) =>
                            setNewBook({ ...newBook, author: e.target.value })
                        }
                        className="p-3 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 outline-none focus:ring-2 ring-blue-500 transition text-slate-900 dark:text-white"
                    />
                    <select
                        value={newBook.category}
                        onChange={(e) =>
                            setNewBook({ ...newBook, category: e.target.value })
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
                            setNewBook({ ...newBook, comment: e.target.value })
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

            {/* 태그 관리 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Tag Management
                </h3>
                <div className="flex gap-2 mb-4">
                    <input
                        placeholder="New Tag"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        className="flex-1 p-2 text-xs rounded-lg border border-slate-100 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <button
                        onClick={() => {
                            handleAddCategory(newCatName);
                            setNewCatName("");
                        }}
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
                                        categories.filter((c) => c !== cat),
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
    );
}

export default React.memo(Admin);
