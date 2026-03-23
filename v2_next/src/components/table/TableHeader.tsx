import useAdminStore from "@/hooks/useAdminStore";
import useThemeStore from "@/hooks/useThemeStore";
import React from "react";

const TableHeader = () => {
    const { isDarkMode } = useThemeStore();
    const { isAdmin } = useAdminStore();

    const theadStyle = {
        backgroundColor: isDarkMode ? "#1d293d8a" : "#f8fafc8a",
        color: isDarkMode ? "#90a1b9" : "#000000",
        borderColor: isDarkMode ? "#1d293d" : "#f1f5f9",
    };

    return (
        <thead
            style={theadStyle}
            className="text-xs uppercase font-bold tracking-widest border-b"
        >
            <tr>
                <th className="p-5 w-[30%]">Item Information</th>
                <th className="p-5 w-[15%] text-center">Category</th>
                <th className="p-5 w-[15%] text-center">Status</th>
                <th className="p-5 w-[20%]">Read History</th>
                <th className="p-5 w-[20%]">Feedback</th>
                {isAdmin && <th className="p-5 w-15"></th>}
            </tr>
        </thead>
    );
};

export default React.memo(TableHeader);
