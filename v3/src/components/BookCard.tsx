import React from 'react';

interface Props {
    item: BookDTO;
}

const BookCard = ({ item }: Props) => {
    return (
        <div
            key={item.id}
            className='grid grid-cols-[1fr_80px_80px_80px_80px_2fr] gap-4 items-center p-2 text-sm text-center'
        >
            <div className='flex flex-col gap-1 text-left truncate'>
                <p className='font-bold truncate'>{item.title}</p>
                <p className='text-xs text-slate-500 truncate'>{item.author}</p>
            </div>
            <p>category...</p>
            <p className='text-xs'>{item.readAt.slice(0, 10)}</p>
            <p>{item.count}</p>
            <p>{item.rating}</p>
            <p className='text-left truncate'>{item.comment}</p>
        </div>
    );
};

export default BookCard;
