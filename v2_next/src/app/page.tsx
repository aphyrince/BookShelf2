"use client";

import { useEffect } from "react";
import useThemeStore from "@/hooks/useThemeStore";
import Header from "@/components/Header";
import Admin from "@/components/Admin";
import useAdminStore from "@/hooks/useAdminStore";
import useBookStore from "@/hooks/useBookStore";
import Table from "@/components/Table";

export default function ReadingLog() {
    const { fetchBooks } = useBookStore();
    const { isDarkMode } = useThemeStore();
    const { isAdmin } = useAdminStore();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div
            style={{
                backgroundColor: `${isDarkMode ? "#0f172b" : "#f8fafc"}`,
                color: `${isDarkMode ? "#f1f5f9" : "#0f172b"}`,
            }}
            className={"min-h-screen p-4 md:p-8 transition-colors"}
        >
            <div className="max-w-7xl mx-auto">
                <Header />
                {isAdmin && <Admin />}
                <Table />
            </div>
        </div>
    );
}
