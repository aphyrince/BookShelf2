import React from 'react';

const TableHeader = () => {
    return (
        <div className='grid grid-cols-[1fr_80px_80px_80px_80px_2fr] gap-4 px-2 py-3 bg-gray-300 text-black text-sm font-bold tracking-widest text-center'>
            <p className='text-left'>Title & Authors</p>
            <p>Category</p>
            <p>Read-at</p>
            <p>Count</p>
            <p>Rating</p>
            <p className='text-left'>Comment</p>
        </div>
    );
};

export default TableHeader;
