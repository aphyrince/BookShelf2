'use client';
import React from 'react';
import useDB from '../hooks/useDB';
import TableHeader from './TableHeader';

const Table = () => {
    const { books, loading, error } = useDB();
    return (
        <div className='flex-col outline outline-slate-300'>
            <TableHeader />
            {/* 카드 리스트 */}
            <div className='divide-y divide-slate-500'>
                {books &&
                    books.map((item) => (
                        <div
                            key={item.id}
                            className='grid grid-cols-[1fr_80px_80px_80px_80px_1fr] items-center p-2 text-sm text-center'
                        >
                            <div className='flex flex-col gap-1 text-left'>
                                <p className='font-bold truncate'>{item.title}</p>
                                <p className='text-xs text-slate-500 truncate ml-4'>{item.author}</p>
                            </div>
                            <p>category...</p>
                            <p className='text-xs'>{item.readAt.slice(0, 10)}</p>
                            <p>{item.count}</p>
                            <p>{item.rating}</p>
                            <p className='text-left'>{item.comment}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Table;
