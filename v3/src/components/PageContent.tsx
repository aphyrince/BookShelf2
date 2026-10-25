'use client';

import Header from '@/src/components/Header';
import AddBookModal from '@/src/components/modals/addBook/AddBookModal';
import CategoryModal from '@/src/components/modals/category/CategoryModal';
import DetailModal from '@/src/components/modals/detail/DetailModal';
import Table from '@/src/components/Table';
import { refreshBook } from '@/src/hooks/useBookStore';
import { refreshCategory } from '@/src/hooks/useCategoryStore';
import { useModalStore } from '@/src/hooks/useModal';
import React, { useCallback, useEffect, useState } from 'react';
import { persistThemePreference } from '../utils/persistThemePreference';

interface Props {
    initialDarkTheme: boolean;
}

const PageContent = ({ initialDarkTheme }: Props) => {
    const [darkMode, setDarkMode] = useState(initialDarkTheme);
    const activeModal = useModalStore((s) => s.activeModal);

    useEffect(() => {
        refreshBook();
        refreshCategory();
    }, []);

    const handleToggleTheme = useCallback(() => {
        const nextDarkMode = !darkMode;
        setDarkMode(nextDarkMode);
        persistThemePreference(nextDarkMode);
    }, [darkMode]);

    return (
        <div
            className={`${darkMode && 'dark'} flex flex-col gap-4 md:gap-8 
                bg-slate-50 text-slate-900 
                dark:bg-slate-800 dark:text-white 
                min-h-screen p-4 md:p-12 
                transition-colors duration-300`}
        >
            <Header onToggleTheme={handleToggleTheme} />
            <hr />
            {activeModal === 'CATEGORY' && <CategoryModal />}
            {activeModal === 'DETAIL' && <DetailModal />}
            {activeModal === 'ADD' && <AddBookModal />}
            <Table />
        </div>
    );
};

export default PageContent;
