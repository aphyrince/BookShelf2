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
        <thead
            style={theadStyle}
            className="text-xs font-bold tracking-widest border-b duration-200"
        >
            <tr>
                <th className="p-4 w-[20%]">Title & Authors</th>
                <th className="p-4 w-[8%] text-center">Category</th>
                <th className="p-4 w-[8%] text-center">Status</th>
                <th className="p-4 w-[8%]">Read-at</th>
                <th className="p-4">Comment</th>
                {isAdmin && <th className="p-4 w-15"></th>}
            </tr>
        </thead>
    );
};

export default React.memo(TableHeader);
