import { setDetailItem, setModalMode, useModalStore } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import React, { useCallback, useMemo } from 'react';
import DetailItemCard from '../DetailItemCard';
import CategoryCard from '../CategoryCard';
import { getCategoryById, useCategoryStore } from '@/src/hooks/useCategoryStore';

const DetailModal = () => {
    const item = useModalStore((s) => s.bookDetail) as BookDTO;
    const categories = useCategoryStore((s) => s.categories);
    const categoryItem = useMemo(() => getCategoryById(item.category), [item.category, categories]);

    const closeModal = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();
        setModalMode('NONE');
        setDetailItem(null);
    }, []);

    return (
        <div className='absolute inset-0 flex justify-center items-center bg-black/50' onClick={closeModal}>
            <div
                className='fixed top-1/2 left-1/2 -translate-1/2 w-4/5 min-w-100 p-4 md:p-8 flex flex-col gap-2 md:gap-4 
                         bg-slate-50 dark:bg-slate-900 dark:border dark:border-white
                           rounded-xl overflow-hidden'
                onClick={(e) => e.stopPropagation()}
            >
                {/* 디테일 헤더 */}
                <div className='flex items-center gap-4'>
                    <p className='flex-1 text-2xl '>Detail</p>
                    <HeaderButton text='edit' onClick={() => {}} />
                    <HeaderButton text='X' onClick={closeModal} />
                </div>
                <hr />
                <div className='flex flex-col gap-2'>
                    <DetailItemCard label='title' text={item.title} />
                    <DetailItemCard label='author' text={item.author} />
                    <div className='grid grid-cols-2'>
                        <p className='uppercase'>category</p>
                        {categoryItem && <CategoryCard item={categoryItem} customStyle=' truncate mr-auto' />}
                    </div>
                    <DetailItemCard label='count' text={item.count} />
                    <DetailItemCard label='rating' text={item.rating} />
                    <DetailItemCard label='read at' text={item.readAt.slice(0, 10)} />
                    <DetailItemCard label='create at' text={item.createAt.slice(0, 10)} />
                    <DetailItemCard label='updated at' text={item.updatedAt.slice(0, 10)} />
                    <div className='flex flex-col gap-2'>
                        <p className='uppercase'>comment</p>
                        <p>{item.comment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
