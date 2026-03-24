import { Book } from "@/types/Book";
import { BookStatus } from "@/types/Status";
import React, { memo } from "react";

interface TableItemProps {
    book: Book;
    isAdmin: boolean; // 부모로부터 전달받음
    updateStatus: (id: number, status: BookStatus) => void;
    addReadDate: (id: number) => void;
    handleDelete: (id: number) => void; // Book 객체 대신 ID만 받도록 단순화
}

const TableItem = ({
    book,
    isAdmin,
    updateStatus,
    addReadDate,
    handleDelete,
}: TableItemProps) => {
    // 이벤트 핸들러 최적화
    const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateStatus(book.id, e.target.value as BookStatus);
    };

    console.log("render! :", book.title);
    return (
        <div className="group grid grid-cols-[1fr_80px_80px_80px_minmax(0,2fr)] gap-4 place-items-center p-2 h-12 duration-150">
            <div className="place-self-start flex flex-col gap-1 overflow-hidden">
                <p className="font-bold text-xs truncate w-full">
                    {book.title}
                </p>
                <p className="text-xs text-slate-400 truncate w-full">
                    {book.author || "N/A"}
                </p>
            </div>

            <div className="text-xs font-black truncate w-full text-center">
                {book.category}
            </div>

            <div className="flex justify-center">
                {isAdmin ? (
                    <select
                        value={book.status}
                        onChange={onStatusChange}
                        className="text-[11px] bg-transparent border border-slate-200 dark:border-slate-700 rounded p-1 outline-none"
                    >
                        <option value="읽는 중">🟠 읽는 중</option>
                        <option value="완료">🟢 완료</option>
                        <option value="포기함">⚫ 포기함</option>
                    </select>
                ) : (
                    <span title={book.status}>
                        {book.status === "완료"
                            ? "🟢"
                            : book.status === "읽는 중"
                              ? "🟠"
                              : "⚫"}
                    </span>
                )}
            </div>

            <div className="flex flex-col items-center h-full text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-200 dark:scrollbar-track-slate-800 duration-200">
                {book.readAt.map((d, i) => (
                    <div
                        key={`${book.id}-read-${i}`}
                        className="whitespace-nowrap"
                    >
                        {d}
                    </div>
                ))}
                {isAdmin && (
                    <button
                        onClick={() => addReadDate(book.id)}
                        className="text-blue-500 hover:font-bold mt-1"
                    >
                        + Log
                    </button>
                )}
            </div>

            <div className="relative w-full flex items-center gap-2">
                <p className="flex-1 text-xs text-slate-500 italic truncate line-clamp-1">
                    {book.comment || "ㅡ"}
                </p>
                {isAdmin && (
                    <button
                        onClick={() => handleDelete(book.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-opacity"
                        aria-label="삭제"
                    >
                        🗑️
                    </button>
                )}
            </div>
        </div>
    );
};

// props가 변하지 않으면 리렌더링하지 않음
export default memo(TableItem);
