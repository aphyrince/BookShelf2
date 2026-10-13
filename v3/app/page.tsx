'use client';

import useDB from '@/src/hooks/useDB';
import Image from 'next/image';
import React, { useState } from 'react';

const Page = () => {
    const { books, loading, error, addBooks } = useDB();
    const [title, setTitle] = useState('');

    return (
        <div>
            {error && error}
            {loading && 'loading...'}
            {books && books.map((item) => item.title)}
            <div className='p-4'>
                <input
                    type='text'
                    className='p-2 border-2 border-gray-500 rounded-md'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
                <button className='p-2 bg-gray-200 rounded-md' onClick={() => addBooks({ title })}>
                    추가
                </button>
            </div>
        </div>
    );
};

export default Page;
