'use client';

import Header from '@/src/components/Header';
import CategoryModal from '@/src/components/modals/category/CategoryModal';
import DetailModal from '@/src/components/modals/detail/DetailModal';
import Table from '@/src/components/Table';
import { refreshBook } from '@/src/hooks/useBookStore';
import { refreshCategory } from '@/src/hooks/useCategoryStore';
import { useModalStore } from '@/src/hooks/useModal';
import { useThemeStore } from '@/src/hooks/useThemeStroe';
import React, { useEffect } from 'react';

const Page = () => {
    const darkMode = useThemeStore((s) => s.darkTheme);
    const activeModal = useModalStore((s) => s.activeModal);

    useEffect(() => {
        refreshBook();
        refreshCategory();
    }, []);

    return (
        <div
            className={`${darkMode && 'dark'} flex flex-col gap-4 md:gap-12 min-h-screen p-4 md:p-12 bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-white transition-colors duration-300`}
        >
            <Header />
            <hr />
            {activeModal === 'CATEGORY' && <CategoryModal />}
            {activeModal === 'DETAIL' && <DetailModal />}
            <Table />
        </div>
    );
};

export default Page;
