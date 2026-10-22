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
                className='absolute top-30 flex flex-col gap-4 bg-slate-50 dark:bg-slate-900 dark:border dark:border-white min-w-100 h-[75vh] p-4 md:p-8 rounded-xl overflow-hidden'
                onClick={handleModalClick}
            >
                {/* 카테고리 헤더 */}
                <div className='flex items-center gap-4 '>
                    <p className='flex-1 text-2xl '>Category</p>
                    <HeaderButton text='X' onClick={closeModal} />
                </div>
                <div className='flex flex-1 min-h-0 gap-2'>
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
