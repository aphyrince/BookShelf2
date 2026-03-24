"use client";

import { useEffect } from "react";
import useThemeStore from "@/hooks/useThemeStore";
import Header from "@/components/Header";
import Admin from "@/components/Admin";
import useAdminStore from "@/hooks/useAdminStore";
import useBookStore from "@/hooks/useBookStore";
import Table from "@/components/table/Table";

export default function ReadingLog() {
    const fetchBooks = useBookStore((state) => state.fetchBooks);
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const isAdmin = useAdminStore((state) => state.isAdmin);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div
            className={`${isDarkMode && "dark"} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen p-4 md:p-8 transition-colors duration-200`}
        >
            <div className="max-w-7xl mx-auto">
                <Header />
                {isAdmin && <Admin />}
                <Table />
            </div>
        </div>
    );
}
