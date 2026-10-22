import React, { useMemo } from 'react';
import CategoryCard from './CategoryCard';
import { getCategoryById, useCategoryStore } from '../hooks/useCategoryStore';

interface Props {
    item: BookDTO;
}

const BookCard = ({ item }: Props) => {
    const categories = useCategoryStore((s) => s.categories);
    const categoryItem = useMemo(() => getCategoryById(item.category), [item.category, categories]);
    return (
        <div
            key={item.id}
            className='grid grid-cols-[1fr_80px_80px_80px_80px_2fr] gap-4 items-center p-2 text-sm text-center'
        >
            <div className='flex flex-col gap-1 text-left truncate'>
                <p className='font-bold truncate'>{item.title}</p>
                <p className='text-xs text-slate-500 truncate'>{item.author}</p>
            </div>
            {/* <p>{item.category}</p> */}
            {categoryItem && <CategoryCard item={categoryItem} customStyle=' truncate' />}
            <p className='text-xs'>{item.readAt.slice(0, 10)}</p>
            <p>{item.count}</p>
            <p>{item.rating}</p>
            <p className='text-left truncate'>{item.comment}</p>
        </div>
    );
};

export default BookCard;
