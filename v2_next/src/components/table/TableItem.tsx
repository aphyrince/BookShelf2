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
        <tr key={book.id}>
            <td className="px-4 py-2 align-top">
                <div className="font-bold text-base truncate">{book.title}</div>
                <div className="text-xs text-slate-400 mt-1">
                    {book.author || "N/A"}
                </div>
            </td>
            <td className="h-full p-2">
                <span className="inline-block px-2 py-1 rounded-lg text-xs font-black bg-blue-50 dark:bg-blue-900/30 text-blue-500 border border-blue-100/50">
                    {book.category}
                </span>
            </td>
            <td className="p-2 align-top text-center">
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
                        <option value="포기함">🔴 포기함</option>
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
            <td className="px-4 py-2 align-top">
                <div className="text-[10px] space-y-1">
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
            </td>
            <td className="px-4 py-2 align-top">
                <p className="text-[11px] text-slate-500 italic line-clamp-3">
                    {book.comment || "-"}
                </p>
            </td>
            {isAdmin && (
                <td className="px-4 py-2 align-top">
                    <button
                        onClick={() => handleDelete(book)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500"
                    >
                        🗑️
                    </button>
                </td>
            )}
        </tr>
    );
};

export default TableItem;
