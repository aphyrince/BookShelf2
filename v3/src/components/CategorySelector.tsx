import React from 'react';
import { useCategoryStore } from '../hooks/useCategoryStore';
import CategoryCard from './CategoryCard';

interface Props {
    show: boolean;
    onSelect: (category: CategoryDTO) => void;
    onClose: () => void;
    custumStyle?: string;
}

const CategorySelector = ({ show, onSelect, onClose, custumStyle = '' }: Props) => {
    const categories = useCategoryStore((s) => s.categories);

    return (
        <div
            className={`relative ${custumStyle} not-md:absolute not-md:w-full not-md:top-full -left-2 translate-y-1`}
            onClick={(e) => e.stopPropagation()}
        >
            {show && (
                <div className='absolute left-2 w-full h-50 overflow-auto flex flex-col gap-2 items-center bg-slate-50 dark:bg-slate-900 p-2 border rounded-2xl'>
                    {categories?.map((category) => (
                        <CategoryCard
                            key={category.id}
                            item={category}
                            customStyle='cursor-pointer'
                            onClick={() => {
                                onSelect(category);
                                onClose();
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategorySelector;
