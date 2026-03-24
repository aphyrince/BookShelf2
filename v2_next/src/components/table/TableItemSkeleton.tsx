import React, { memo } from "react";

const TableItemSkeleton = () => {
    return (
        <div className="group grid grid-cols-[1fr_80px_80px_80px_2fr] gap-4 place-items-center p-2 h-12 border-b border-slate-800/50 dark:border-slate-50/50 bg-slate-50 dark:bg-slate-900 animate-pulse">
            {/* 제목 & 저자 영역 */}
            <div className="place-self-start flex flex-col gap-1 w-full">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            </div>

            {/* 카테고리 영역 */}
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>

            {/* 상태 영역 */}
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>

            {/* 읽은 날짜 영역 */}
            <div className="flex flex-col gap-1 w-full items-center">
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
            </div>

            {/* 코멘트 영역 */}
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
        </div>
    );
};

// 불필요한 리렌더링 방지
export default memo(TableItemSkeleton);
