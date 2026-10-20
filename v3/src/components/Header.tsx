import React from 'react';

const Header = () => {
    return (
        <header className='flex justify-center items-center gap-4'>
            <h1 className='flex-1 text-3xl italic tracking-tight'>안정호의 책장</h1>
            <button className='px-4 py-2 rounded-md bg-white border-slate-600 border text-sm uppercase font-bold cursor-pointer duration-200 hover:invert-100'>
                Dark
            </button>
            <button className='px-4 py-2 rounded-md bg-white border-slate-600 border text-sm uppercase font-bold cursor-pointer duration-200 hover:invert-100'>
                Admin
            </button>
        </header>
    );
};

export default Header;
