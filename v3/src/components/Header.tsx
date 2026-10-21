import React from 'react';
import Admin from './Admin';
import { toggleTheme } from '../hooks/useThemeStroe';
import HeaderButton from '../shared/HeaderButton';

const Header = () => {
    return (
        <header className='flex justify-center items-center gap-4'>
            <h1 className='flex-1 text-3xl italic tracking-tight'>안정호의 책장</h1>
            <Admin />
            <HeaderButton text={'Dark'} onClick={toggleTheme} />
        </header>
    );
};

export default Header;
