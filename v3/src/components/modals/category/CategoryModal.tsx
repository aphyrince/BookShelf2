import { useCategoryStore } from '@/src/hooks/useCategoryStore';
import { setModalMode } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import React, { useCallback } from 'react';
import CategoryCard from '../../CategoryCard';
import CategoryEditor from './CategoryEditor';
import { setCategoryEditorItem, setCategoryEditorMode } from '@/src/hooks/useCategoryEditorStore';

const CategoryModal = () => {
    const categories = useCategoryStore((s) => s.categories);

    const closeModal = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();
        setModalMode('NONE');
    }, []);

    const handleModalClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }, []);

    const handleCategoryClick = useCallback((item: CategoryDTO) => {
        setCategoryEditorMode('EDIT');
        setCategoryEditorItem(item);
    }, []);

    return (
        <div className='absolute inset-0 flex justify-center items-center bg-black/50' onClick={closeModal}>
            <div
                className='fixed top-1/2 left-1/2 -translate-1/2 
                           flex flex-col gap-2 md:gap-4 
                           max-w-150 w-4/5 min-w-100 h-[75dvh] p-4 md:p-8 
                           bg-slate-50 dark:bg-slate-900 dark:border dark:border-white 
                           rounded-xl overflow-hidden'
                onClick={handleModalClick}
            >
                {/* 카테고리 헤더 */}
                <div className='flex items-center gap-4'>
                    <p className='flex-1 text-2xl '>Category</p>
                    <HeaderButton text='X' onClick={closeModal} />
                </div>
                <div className='flex flex-1 min-h-0 gap-2 md:gap-4'>
                    <div className='flex flex-col gap-3 items-center py-3 min-h-0 overflow-y-auto'>
                        {/* 카테고리 카드 */}
                        {categories &&
                            categories.map((item) => (
                                <CategoryCard
                                    key={item.id}
                                    item={item}
                                    onClick={() => handleCategoryClick(item)}
                                    customStyle='cursor-pointer'
                                />
                            ))}
                    </div>
                    <CategoryEditor />
                </div>
            </div>
        </div>
    );
};

export default React.memo(CategoryModal);
