import React from 'react';

interface Props {
    key: React.Key;
}

const BookCardSkeleton = ({ key }: Props) => {
    return (
        <div
            key={key}
            className='grid grid-cols-[3fr_2fr_1fr_1fr_1fr_2fr] md:grid-cols-[1fr_80px_80px_80px_80px_2fr] gap-1 md:gap-4 items-center p-2 
            [&_div]:bg-slate-300 [&_div]:animate-pulse '
        >
            <section className='flex flex-col gap-1'>
                <div className='w-3/4 h-4' />
                <div className='w-1/4 h-2' />
            </section>
            <div className='w-1/2 h-5 m-auto rounded-xl ' />
            <div className=' w-4/5 m-auto h-3' />
            <div className=' w-1/4 m-auto h-2' />
            <div className=' w-1/4 m-auto h-2' />
            <div className=' w-full h-3' />
        </div>
    );
};

export default BookCardSkeleton;
