import React, { useCallback, useMemo } from 'react';
import CategoryCard from './CategoryCard';
import { getCategoryById, useCategoryStore } from '../hooks/useCategoryStore';
import { setDetailItem, setModalMode, setPrevBookDetail } from '../hooks/useModal';

interface Props {
    item: BookDTO;
}

const BookCard = ({ item }: Props) => {
    const categories = useCategoryStore((s) => s.categories);
    const categoryItem = useMemo(() => getCategoryById(item.category), [item.category, categories]);

    const handleOpenDetail = useCallback(() => {
        setModalMode('DETAIL');
        setDetailItem(item);
        setPrevBookDetail(item);
    }, [item]);

    return (
        <div
            key={item.id}
            className='grid grid-cols-[3fr_2fr_1fr_1fr_1fr_2fr] md:grid-cols-[1fr_80px_80px_80px_80px_2fr] gap-1 md:gap-4 items-center p-2 text-xs md:text-sm text-center cursor-pointer hover:bg-slate-100 transition-colors duration-300 outline-0 hover:outline-1'
            onClick={handleOpenDetail}
        >
            <div className='flex flex-col gap-1 text-left truncate'>
                <p className='font-bold truncate'>{item.title}</p>
                <p className='text-[0.6rem] md:text-xs text-slate-500 truncate'>{item.author}</p>
            </div>
            {categoryItem ? (
                <CategoryCard item={categoryItem} customStyle=' truncate m-auto not-md:text-[0.6rem]' />
            ) : (
                <p></p>
            )}
            <p className='text-[0.6rem] md:text-xs'>{item.readAt.slice(0, 10)}</p>
            <p>{item.count}</p>
            <p>{item.rating}</p>
            <p className='text-center md:text-left truncate'>{item.comment}</p>
        </div>
    );
};

export default BookCard;
