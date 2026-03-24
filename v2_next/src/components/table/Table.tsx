import React, { useCallback, useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import useBookStore from "@/hooks/useBookStore";
import useCategoryStore from "@/hooks/useCategoryStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import useAdminStore from "@/hooks/useAdminStore";
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
import TableItemSkeleton from "./TableItemSkeleton"; // 스켈레톤 컴포넌트 임포트
import { BookStatus } from "@/types/Status";

const Table = () => {
    // 로딩 상태 추가 (가정)
    const [isLoading, setIsLoading] = useState(true);

    // 개별 Selector 사용으로 불필요한 리렌더링 방지
    const books = useBookStore((state) => state.books);
    const updateBookStatus = useBookStore((state) => state.updateBookStatus);
    const addBookReadDate = useBookStore((state) => state.addBookReadDate);
    const deleteBook = useBookStore((state) => state.deleteBook);
    const isAdmin = useAdminStore((state) => state.isAdmin);

    const categories = useCategoryStore((state) => state.categories);
    const password = usePasswordStore((state) => state.password);

    // 데이터 로딩 시뮬레이션 (실제로는 fetchBooks 등에서 처리)
    useEffect(() => {
        if (books.length > 0) {
            setIsLoading(false);
        } else {
            // 데이터가 없더라도 로딩 중이 아니라면 로딩 완료로 설정 (예외 처리)
            // setIsLoading(false);
        }
    }, [books]);

    // 가상 스크롤을 위한 컨테이너 참조
    const parentRef = useRef<HTMLDivElement>(null);

    // 가상화 설정
    const rowVirtualizer = useVirtualizer({
        count: books.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 48, // h-12 = 48px
        overscan: 5,
    });

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

            {/* 스크롤이 발생하는 컨테이너 (높이 지정 필수) */}
            <div
                ref={parentRef}
                className="overflow-auto"
                style={{ height: "600px" }} // 원하는 높이로 고정
            >
                {/* 데이터 로딩 중일 때 스켈레톤 리스트 표시 */}
                {isLoading && (
                    <div className="flex flex-col divide-y divide-slate-800/50 dark:divide-slate-50/50">
                        {[...Array(10)].map((_, i) => (
                            <TableItemSkeleton key={`skeleton-${i}`} />
                        ))}
                    </div>
                )}

                {/* 데이터 로딩 완료 후 가상 리스트 표시 */}
                {!isLoading && books.length > 0 && (
                    <div
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                        className="divide-y divide-slate-800/50 dark:divide-slate-50/50"
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                            const book = books[virtualRow.index];
                            if (!book) return null; // 데이터 보호

                            return (
                                <div
                                    key={virtualRow.key}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                >
                                    <TableItem
                                        book={book}
                                        isAdmin={isAdmin}
                                        addReadDate={handleAddReadDate}
                                        handleDelete={() =>
                                            handleDelete(book.id)
                                        }
                                        updateStatus={handleUpdateStatus}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 데이터가 없을 때 표시할 UI (옵션) */}
                {!isLoading && books.length === 0 && (
                    <div className="flex items-center justify-center h-full text-slate-500">
                        책 목록이 비어 있습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(Table);
