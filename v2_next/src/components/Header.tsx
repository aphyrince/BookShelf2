"use client";

import useAdminStore from "@/hooks/useAdminStore";
import useSyncStore from "@/hooks/useSyncStore";
import useThemeStore from "@/hooks/useThemeStore";

interface HeaderProps {
    onLogin: () => void;
    onLogout: () => void;
}

export default function Header({ onLogin, onLogout }: HeaderProps) {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const { isSyncing } = useSyncStore();
    const { isAdmin } = useAdminStore();

    return (
        <header className="flex justify-between items-center mb-10 border-b pb-4 dark:border-slate-700">
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
                    className="p-2 border rounded-xl bg-white dark:bg-slate-800 dark:border-slate-600 text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                    {isDarkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
                <button
                    onClick={isAdmin ? onLogout : onLogin}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition shadow-sm ${
                        isAdmin
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                    }`}
                >
                    {isAdmin ? "LOGOUT" : "ADMIN LOGIN"}
                </button>
            </div>
        </header>
    );
}
