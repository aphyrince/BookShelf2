'use client';

import Header from '@/src/components/Header';
import useDB from '@/src/hooks/useDB';
import Image from 'next/image';
import React, { useState } from 'react';

const Page = () => {
    const { books, loading, error } = useDB();

    return (
        <div className='bg-slate-50 text-slate-900 min-h-screen p-4 md:p-8 '>
            <Header />
        </div>
    );
};

export default Page;
