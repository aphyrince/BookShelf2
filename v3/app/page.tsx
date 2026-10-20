'use client';

import Header from '@/src/components/Header';
import Table from '@/src/components/Table';
import React from 'react';

const Page = () => {
    return (
        <div className='flex flex-col gap-4 md:gap-12 min-h-screen p-4 md:p-12 bg-slate-50 text-slate-900'>
            <Header />
            <hr />
            <Table />
        </div>
    );
};

export default Page;
