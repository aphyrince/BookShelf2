'use client';

import Header from '@/src/components/Header';
import useDB from '@/src/hooks/useDB';
import Image from 'next/image';
import React, { useState } from 'react';

const Page = () => {
    const { books, loading, error } = useDB();

    return (
        <div>
            <Header />
        </div>
    );
};

export default Page;
