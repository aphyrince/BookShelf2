'use client';
import React, { useCallback } from 'react';
import CategoryCard from '../../CategoryCard';
import { setDetailPartialItem } from '@/src/hooks/useModal';

interface Props {
    categories: CategoryDTO[];
    show: boolean;
    onClose: () => void;
}

const DetailCategoryEditor = ({ categories, show, onClose }: Props) => {
    const handleListItemClick = useCallback((category: CategoryDTO) => {
        setDetailPartialItem({ category: category.id });
    }, []);

    return (
        <div className='flex-1 relative' onClick={onClose}>
            {show && (
                <div className='absolute left-2 w-full h-50 overflow-auto flex flex-col gap-2 items-center bg-slate-50 p-2 border rounded-2xl'>
                    {categories?.map((category) => (
                        <CategoryCard
                            key={category.id}
                            item={category}
                            customStyle='cursor-pointer'
                            onClick={() => {
                                handleListItemClick(category);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DetailCategoryEditor;
