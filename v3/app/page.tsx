'use client';

import Header from '@/src/components/Header';
import Table from '@/src/components/Table';
import { useThemeStore } from '@/src/hooks/useThemeStroe';
import React from 'react';

const Page = () => {
    const darkMode = useThemeStore((s) => s.darkTheme);
    return (
        <div
            className={`${darkMode && 'dark'} flex flex-col gap-4 md:gap-12 min-h-screen p-4 md:p-12 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white transition-colors duration-300`}
        >
            <Header />
            <hr />
            <Table />
        </div>
    );
};

export default Page;
