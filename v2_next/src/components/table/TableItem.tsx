import useAdminStore from "@/hooks/useAdminStore";
import { Book } from "@/types/Book";
import { BookStatus } from "@/types/Status";
import React from "react";

interface TableItemProps {
    book: Book;
    updateStatus: (id: number, status: BookStatus) => Promise<void>;
    addReadDate: (id: number) => Promise<void>;
    handleDelete: (book: Book) => void;
}

const TableItem = ({
    book,
    updateStatus,
    addReadDate,
    handleDelete,
}: TableItemProps) => {
    const { isAdmin } = useAdminStore();

    return (
        <div
            key={book.id}
            className="grid grid-cols-[1fr_80px_80px_80px_2fr] gap-4 place-items-center p-2 h-12 "
        >
            <div className="place-self-start flex flex-col gap-1">
                <p className="font-bold text-xs truncate">{book.title}</p>
                <p className="text-xs text-slate-400">{book.author || "N/A"}</p>
            </div>
            <div className="text-xs font-black">{book.category}</div>
            <div>
                {isAdmin ? (
                    <select
                        value={book.status}
                        onChange={(e) =>
                            updateStatus(book.id, e.target.value as BookStatus)
                        }
                        className="text-[11px] bg-transparent border border-slate-200 dark:border-slate-700 rounded p-1"
                    >
                        <option value="읽는 중">🟠 읽는 중</option>
                        <option value="완료">🟢 완료</option>
                        <option value="포기함">⚫ 포기함</option>
                    </select>
                ) : book.status === "완료" ? (
                    "🟢"
                ) : book.status === "읽는 중" ? (
                    "🟠"
                ) : (
                    "⚫"
                )}
            </div>
            <div className="flex flex-col items-center h-full text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-200 dark:scrollbar-track-slate-800 duration-200">
                {book.readAt.map((d, i) => (
                    <div key={i}>{d}</div>
                ))}
                {isAdmin && (
                    <button
                        onClick={() => addReadDate(book.id)}
                        className="text-blue-500 hover:underline"
                    >
                        + Log
                    </button>
                )}
            </div>
            <p className="justify-self-start text-xs text-slate-500 italic line-clamp-2">
                {book.comment || "ㅡ"}
            </p>
            {isAdmin && (
                <button
                    onClick={() => handleDelete(book)}
                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500"
                >
                    🗑️
                </button>
            )}
        </div>
    );
};

export default TableItem;
