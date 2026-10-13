'use client';

import Header from '@/src/components/Header';
import Table from '@/src/components/Table';
import React from 'react';

const Page = () => {
    return (
        <div className='bg-slate-50 text-slate-900 min-h-screen p-4 md:p-8 '>
            <Header />
            <hr />
            <Table />
        </div>
    );
};

export default Page;
