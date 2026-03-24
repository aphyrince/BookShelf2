import useBookStore from "@/hooks/useBookStore";
import useCategoryStore from "@/hooks/useCategoryStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import { BookStatus } from "@/types/Status";
import React, { useCallback } from "react";
import TableHeader from "./TableHeader";
import { Book } from "@/types/Book";
import TableItem from "./TableItem";
import useThemeStore from "@/hooks/useThemeStore";

const Table = () => {
    const { categories } = useCategoryStore();
    const { books, syncBooks } = useBookStore();
    const { password } = usePasswordStore();
    const { isDarkMode } = useThemeStore();

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

    const style = {
        backgroundColor: isDarkMode ? "#0f172b" : "#ffffff",
        color: isDarkMode ? "#e9e9e9" : "#181818",
        borderColor: isDarkMode ? "#314158" : "#e2e8f0",
    };

    return (
        <div
            style={style}
            className="flex flex-col column overflow-hidden border shadow-sm duration-200"
        >
            {/* <table className="w-full text-left table-fixed border-collapse"> */}
            <TableHeader />
            <div className="flex flex-col divide-y divide-slate-50 dark:divide-slate-800/50">
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
            {/* </table> */}
        </div>
    );
};

export default React.memo(Table);
