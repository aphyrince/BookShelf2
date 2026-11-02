import React, { useCallback } from 'react';
import Admin from './Admin';
import HeaderButton from '../shared/HeaderButton';
import { useAdminStore } from '../hooks/useAdminStore';
import { setModalMode } from '../hooks/useModal';
import { FilePlus, Moon } from 'lucide-react';

interface Props {
    onToggleTheme: () => void;
}

const Header = ({ onToggleTheme }: Props) => {
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
            {login && <HeaderButton Icon={FilePlus} onClick={handleAddBookPress} />}
            {login && <HeaderButton text={'Category'} onClick={handleCategoryPress} />}
            <Admin />
            <HeaderButton Icon={Moon} onClick={onToggleTheme} />
        </header>
    );
};

export default Header;
