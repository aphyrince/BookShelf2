import useAdminStore from "@/hooks/useAdminStore";
import useThemeStore from "@/hooks/useThemeStore";
import React from "react";

const TableHeader = () => {
    const { isDarkMode } = useThemeStore();
    const { isAdmin } = useAdminStore();

    const theadStyle = {
        backgroundColor: isDarkMode ? "#1d293d8a" : "#cececea6",
        color: isDarkMode ? "#90a1b9" : "#313131",
        borderColor: isDarkMode ? "#1d293d" : "#25252591",
    };

    return (
        <div
            style={theadStyle}
            className="grid grid-cols-[1fr_80px_80px_80px_2fr] gap-4 p-2 place-items-center text-xs font-bold tracking-widest border-b duration-200"
        >
            <p className="place-self-start">Title & Authors</p>
            <p>Category</p>
            <p>Status</p>
            <p>Read-at</p>
            <p className="place-self-start">Comment</p>
            {isAdmin && <button>x</button>}
        </div>
    );
};

export default React.memo(TableHeader);
