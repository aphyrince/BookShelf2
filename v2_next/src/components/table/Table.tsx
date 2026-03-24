import useBookStore from "@/hooks/useBookStore";
import useCategoryStore from "@/hooks/useCategoryStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import { BookStatus } from "@/types/Status";
import React, { useCallback } from "react";
import TableHeader from "./TableHeader";
import { Book } from "@/types/Book";
import TableItem from "./TableItem";

const Table = () => {
    const { categories } = useCategoryStore();
    const { books, syncBooks } = useBookStore();
    const { password } = usePasswordStore();

    const updateStatus = async (id: number, status: BookStatus) => {
        const updated = books.map((b) => (b.id === id ? { ...b, status } : b));
        await syncBooks(updated, categories, password);
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
        await syncBooks(updated, categories, password);
    };

    const handleDelete = useCallback(
        (book: Book) => {
            if (confirm("삭제?")) {
                const updated = books.filter((b) => b.id !== book.id);
                syncBooks(updated, categories, password);
            }
        },
        [books, syncBooks, categories, password],
    );

    return (
        <div className="flex flex-col column overflow-hidden border bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50 border-[#c6ccd4] dark:border-[#314158] shadow-sm duration-200">
            <TableHeader />
            <div className="flex flex-col divide-y divide-slate-800/50 dark:divide-slate-50/50 duration-200">
                {books.map((book) => (
                    <TableItem
                        key={book.id}
                        book={book}
                        addReadDate={addReadDate}
                        handleDelete={handleDelete}
                        updateStatus={updateStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(Table);
