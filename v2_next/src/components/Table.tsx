import useAdminStore from "@/hooks/useAdminStore";
import useBookStore from "@/hooks/useBookStore";
import useCategoryStore from "@/hooks/useCategoryStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import { BookStatus } from "@/types/Status";

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

    return (
        <table className="w-full text-left table-fixed border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100 dark:border-slate-800">
                <tr>
                    <th className="p-5 w-[30%]">Item Information</th>
                    <th className="p-5 w-[15%] text-center">Category</th>
                    <th className="p-5 w-[15%] text-center">Status</th>
                    <th className="p-5 w-[20%]">Read History</th>
                    <th className="p-5 w-[20%]">Feedback</th>
                    {isAdmin && <th className="p-5 w-15"></th>}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {books.map((book) => (
                    <tr
                        key={book.id}
                        className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 group"
                    >
                        <td className="p-5 align-top">
                            <div className="font-bold text-sm truncate">
                                {book.title}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1">
                                {book.author || "N/A"}
                            </div>
                        </td>
                        <td className="p-5 align-top text-center">
                            <span className="inline-block px-2 py-1 rounded-lg text-[9px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-500 border border-blue-100/50">
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
                                            e.target.value as BookStatus,
                                        )
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
                        <td className="p-5 align-top">
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
                        <td className="p-5 align-top">
                            <p className="text-[11px] text-slate-500 italic line-clamp-3">
                                {book.comment || "-"}
                            </p>
                        </td>
                        {isAdmin && (
                            <td className="p-5 align-top">
                                <button
                                    onClick={() => {
                                        if (confirm("삭제?")) {
                                            const updated = books.filter(
                                                (b) => b.id !== book.id,
                                            );
                                            syncBooks(
                                                updated,
                                                categories,
                                                password,
                                            );
                                        }
                                    }}
                                    className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500"
                                >
                                    🗑️
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
