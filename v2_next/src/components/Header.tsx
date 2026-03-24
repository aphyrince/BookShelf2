"use client";

import useAdminStore from "@/hooks/useAdminStore";
import usePasswordStore from "@/hooks/usePasswordStore";
import useSyncStore from "@/hooks/useSyncStore";
import useThemeStore from "@/hooks/useThemeStore";
import React, { useCallback } from "react";

function Header() {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const { isSyncing } = useSyncStore();
    const { isAdmin, setIsAdmin } = useAdminStore();
    const { setPassword } = usePasswordStore();

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
                    className={`p-2 border rounded-xl bg-slate-900 dark:bg-slate-50 text-slate-100 dark:text-slate-900 border-slate-100 dark:border-slate-600 text-sm font-bold shadow-sm hover:invert-10 duration-200`}
                >
                    {isDarkMode ? "🔲 Light" : "🔳 Dark"}
                </button>
                <button
                    onClick={isAdmin ? onLogout : onLogin}
                    style={{
                        backgroundColor: `${isAdmin ? "#fb2c36" : isDarkMode ? "#1d293d" : "#f8fafc"}`,
                        color: `${isAdmin ? "#ffffff" : isDarkMode ? "#ffffff" : "#0f172b"}`,
                        borderColor: `${isAdmin ? "#fb2c36" : isDarkMode ? "#f1f5f9" : "#45556c"}`,
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition shadow-sm`}
                >
                    {isAdmin ? "LOGOUT" : "ADMIN LOGIN"}
                </button>
            </div>
        </header>
    );
}

export default React.memo(Header);
