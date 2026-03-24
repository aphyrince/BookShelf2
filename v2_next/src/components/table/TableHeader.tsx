import React from "react";

const TableHeader = () => {
    return (
        <div className="grid grid-cols-[1fr_80px_80px_80px_2fr] gap-4 place-items-center p-2 bg-[#cececea6] dark:bg-slate-800/50 text-[#313131] dark:text-slate-400 border-[#25252591] dark:border-slate-800 text-xs font-bold tracking-widest border-b duration-200">
            <p className="place-self-start">Title & Authors</p>
            <p>Category</p>
            <p>Status</p>
            <p>Read-at</p>
            <p className="place-self-start">Comment</p>
        </div>
    );
};

export default React.memo(TableHeader);
