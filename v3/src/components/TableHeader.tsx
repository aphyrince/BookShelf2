import React from 'react';

const TableHeader = () => {
    return (
        <div className='grid grid-cols-[1fr_80px_80px_80px_80px_1fr] p-2 bg-gray-300 text-gray-600 text-sm font-bold tracking-widest'>
            <p>Title & Authors</p>
            <p>Category</p>
            <p>Read-at</p>
            <p>Count</p>
            <p>Rating</p>
            <p>Comment</p>
        </div>
    );
};

export default TableHeader;
