"use client";

import { useState } from "react";
import { Book } from "./DataTypes";

export default function ReadingLog() {
    // 실제로는 DB에서 가져올 데이터
    const [books, setBooks] = useState<Book[]>([]);
    const [categories, setCategories] = useState([
        "소설",
        "경제/경영",
        "자기계발",
        "기술",
    ]);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부 (로그인 로직 필요)

    // 독서 완료 기록 추가 함수
    const addReadDate = (bookId: string) => {
        setBooks(
            books.map((book) => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        status: "완료" as const,
                        readAt: [
                            ...book.readAt,
                            new Date().toISOString().split("T")[0],
                        ],
                    };
                }
                return book;
            }),
        );
    };

    return (
        <main className="p-8 max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">📚 나의 독서 기록보관소</h1>
                <button
                    onClick={() => setIsAdmin(!isAdmin)}
                    className="text-xs text-gray-400"
                >
                    {isAdmin ? "로그아웃" : "관리자 로그인"}
                </button>
            </header>

            {/* 카테고리 관리 (관리자 전용) */}
            {isAdmin && (
                <section className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <h2 className="font-semibold mb-2">카테고리 편집</h2>
                    <div className="flex gap-2">
                        {categories.map((cat) => (
                            <span
                                key={cat}
                                className="px-2 py-1 bg-white border rounded"
                            >
                                {cat}
                            </span>
                        ))}
                        <button className="text-blue-500 text-sm">
                            + 추가
                        </button>
                    </div>
                </section>
            )}

            {/* 독서 리스트 테이블 */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 border-b">제목/저자</th>
                            <th className="p-4 border-b">카테고리</th>
                            <th className="p-4 border-b">상태</th>
                            <th className="p-4 border-b">읽은 날짜</th>
                            {isAdmin && <th className="p-4 border-b">관리</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50">
                                <td className="p-4 border-b">
                                    <div className="font-medium">
                                        {book.title}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {book.author}
                                    </div>
                                </td>
                                <td className="p-4 border-b">
                                    {book.category}
                                </td>
                                <td className="p-4 border-b">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${
                                            book.status === "완료"
                                                ? "bg-green-100"
                                                : "bg-yellow-100"
                                        }`}
                                    >
                                        {book.status}
                                    </span>
                                </td>
                                <td className="p-4 border-b text-sm">
                                    {book.readAt.map((date, i) => (
                                        <div key={i}>{date}</div>
                                    ))}
                                </td>
                                {isAdmin && (
                                    <td className="p-4 border-b">
                                        <button
                                            onClick={() => addReadDate(book.id)}
                                            className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            완료 추가
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
