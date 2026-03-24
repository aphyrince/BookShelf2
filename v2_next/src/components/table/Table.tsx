import React, { useCallback } from "react";
import useBookStore from "@/hooks/useBookStore";
import useCategoryStore from "@/hooks/useCategoryStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
import { BookStatus } from "@/types/Status";
import useAdminStore from "@/hooks/useAdminStore";

const Table = () => {
    // 개별 Selector 사용으로 불필요한 리렌더링 방지
    const books = useBookStore((state) => state.books);
    const updateBookStatus = useBookStore((state) => state.updateBookStatus);
    const addBookReadDate = useBookStore((state) => state.addBookReadDate);
    const deleteBook = useBookStore((state) => state.deleteBook);
    const isAdmin = useAdminStore((state) => state.isAdmin);

    const categories = useCategoryStore((state) => state.categories);
    const password = usePasswordStore((state) => state.password);

    // 로직이 Store로 이동하여 의존성 배열이 깔끔해짐
    const handleUpdateStatus = useCallback(
        (id: number, status: BookStatus) => {
            updateBookStatus(id, status, categories, password);
        },
        [updateBookStatus, categories, password],
    );

    const handleAddReadDate = useCallback(
        (id: number) => {
            addBookReadDate(id, categories, password);
        },
        [addBookReadDate, categories, password],
    );

    const handleDelete = useCallback(
        (id: number) => {
            if (window.confirm("삭제하시겠습니까?")) {
                deleteBook(id, categories, password);
            }
        },
        [deleteBook, categories, password],
    );

    return (
        <div className="flex flex-col border bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50 border-[#c6ccd4] dark:border-[#314158] shadow-sm duration-200">
            <TableHeader />
            <div className="flex flex-col divide-y divide-slate-800/50 dark:divide-slate-50/50">
                {books.map((book) => (
                    <TableItem
                        key={book.id}
                        book={book}
                        isAdmin={isAdmin}
                        addReadDate={handleAddReadDate}
                        handleDelete={() => handleDelete(book.id)} // ID만 넘기도록 수정
                        updateStatus={handleUpdateStatus}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(Table);
