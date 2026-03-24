"use client";

import useAdminStore from "@/hooks/useAdminStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import useSyncStore from "@/hooks/useSyncStore";
import useThemeStore from "@/hooks/useThemeStore";
import React, { useCallback } from "react";

function Header() {
    const isDarkMode = useThemeStore((state) => state.isDarkMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const isSyncing = useSyncStore((state) => state.isSyncing);
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const setIsAdmin = useAdminStore((state) => state.setIsAdmin);
    const setPassword = usePasswordStore((state) => state.setPassword);

    const onLogin = useCallback(() => {
        const input = prompt("비밀번호 입력");
        if (input) {
            setPassword(input);
            setIsAdmin(true);
        }
    }, [setPassword, setIsAdmin]);

    const onLogout = useCallback(() => {
        setIsAdmin(false);
        setPassword("");
    }, [setPassword, setIsAdmin]);

    return (
        <header className="flex justify-between items-center mb-10 border-b pb-4 dark:border-slate-700 duration-200">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black italic tracking-tighter">
                    안정호의 책장
                </h1>
                {isSyncing && (
                    <span className="text-[10px] animate-pulse text-blue-500 font-bold uppercase">
                        Saving...
                    </span>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={toggleTheme}
                    className={`p-2 border rounded-xl bg-slate-900 dark:bg-slate-50 text-slate-100 dark:text-slate-900 border-slate-100 dark:border-slate-600 text-sm font-bold shadow-sm hover:invert-10 duration-200 cursor-pointer`}
                >
                    {isDarkMode ? "🔲 Light" : "🔳 Dark"}
                </button>
                <button
                    onClick={isAdmin ? onLogout : onLogin}
                    className={`${isAdmin && "admin"} px-4 py-2 rounded-xl admin:bg-red-500 admin:text-white admin:border-red-500 bg-slate-50 text-slate-900 border-slate-600 dark:bg-slate-800 dark:text-slate-50 dark:border-slate-100 text-sm font-bold border transition shadow-sm hover:invert-10 duration-200 cursor-pointer`}
                >
                    {isAdmin ? "LOGOUT" : "ADMIN LOGIN"}
                </button>
            </div>
        </header>
    );
}

export default React.memo(Header);
