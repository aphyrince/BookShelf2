import React, { useCallback } from 'react';
import Admin from './Admin';
import { toggleTheme } from '../hooks/useThemeStroe';
import HeaderButton from '../shared/HeaderButton';
import { useAdminStore } from '../hooks/useAdminStore';
import { setModalMode } from '../hooks/useModal';

const Header = () => {
    const login = useAdminStore((s) => s.login);

    const handleCategoryPress = useCallback(() => {
        setModalMode('CATEGORY');
    }, []);

    const handleAddBookPress = useCallback(() => {
        setModalMode('ADD');
    }, []);

    return (
        <header className='flex justify-center items-center gap-1 md:gap-4'>
            <h1 className='flex-1 text-xl md:text-3xl italic tracking-tight'>안정호의 책장</h1>
            {login && (
                <HeaderButton text={'Add Book'} onClick={handleAddBookPress} customStyle='not-md:w-10 not-md:p-1' />
            )}
            {login && (
                <HeaderButton
                    text={'Edit Category'}
                    onClick={handleCategoryPress}
                    customStyle='not-md:w-15 not-md:p-1'
                />
            )}
            <Admin />
            <HeaderButton text={'Dark'} onClick={toggleTheme} />
        </header>
    );
};

export default Header;
