import useAdminStore from "@/hooks/useAdminStore";
import useBookStore from "@/hooks/useBookStore";
import useCategoryStore from "@/hooks/useCategoryStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import { BookStatus } from "@/types/Status";
import React, { useCallback } from "react";
import TableHeader from "./table/TableHeader";
import { Book } from "@/types/Book";
import TableItem from "./table/TableItem";

const Table = () => {
    const { isAdmin } = useAdminStore();
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
        <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-4xl bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left table-fixed border-collapse">
                <TableHeader isAdmin={isAdmin} />
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {books.map((book) => (
                        <TableItem
                            key={book.id}
                            book={book}
                            addReadDate={addReadDate}
                            handleDelete={handleDelete}
                            updateStatus={updateStatus}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(Table);
