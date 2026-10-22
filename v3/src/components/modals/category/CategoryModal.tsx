import { addCategory, deleteCategory, updateCategory, useCategoryStore } from '@/src/hooks/useCategoryStore';
import { setModalMode } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import React, { useCallback, useState } from 'react';
import CategoryCard from '../../CategoryCard';
import ColorPicker from './ColorPicker';
import CategoryEditorPreview from './CategoryEditorPreview';

const CategoryModal = () => {
    const categories = useCategoryStore((s) => s.categories);

    const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');

    const [item, setItem] = useState<CategoryDTO>({
        id: '',
        text: '',
        bgColor: '#aaaaaa',
        fontColor: '#000000',
        darkBgColor: '#353232',
        darkFontColor: '#fffcfc',
    });

    const closeModal = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();
        setModalMode('NONE');
    }, []);

    const handleModalClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }, []);

    const setAddMode = useCallback(() => {
        setMode('ADD');
    }, []);

    const setEditMode = useCallback(() => {
        setMode('EDIT');
    }, []);

    const handleCategoryClick = useCallback(
        (item: CategoryDTO) => {
            setEditMode();
            setItem(item);
        },
        [setEditMode],
    );

    const handleCancel = useCallback(() => {
        setAddMode();
        setItem((prev) => ({ ...prev, id: '', text: '' }));
    }, [setAddMode]);

    const handleAdd = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...newCategory } = item;
        addCategory(newCategory);
        handleCancel();
    }, [handleCancel, item]);

    const handleCommit = useCallback(() => {
        const { id, ...newCategory } = item;
        updateCategory(id, newCategory);
        handleCancel();
    }, [handleCancel, item]);

    const handleDelete = useCallback(() => {
        deleteCategory(item.id);
        handleCancel();
    }, [handleCancel, item.id]);

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

                    <div className='flex-1 flex flex-col box-border p-4 justify-between h-full border border-black rounded-2xl'>
                        <div className='flex flex-col gap-4'>
                            <input
                                className='outline outline-slate-400 p-1 rounded-lg active:outline-slate-700 focus:outline-slate-700 duration-200'
                                placeholder='category name'
                                type='text'
                                value={item.text}
                                onChange={(e) => {
                                    setItem((prev) => ({ ...prev, text: e.target.value }));
                                }}
                            />
                            <ColorPicker
                                label='bg Color'
                                value={item.bgColor}
                                onChange={(e) => {
                                    setItem((prev) => ({ ...prev, bgColor: e.target.value }));
                                }}
                            />
                            <ColorPicker
                                label='text color'
                                value={item.fontColor}
                                onChange={(e) => {
                                    setItem((prev) => ({ ...prev, fontColor: e.target.value }));
                                }}
                            />
                            <ColorPicker
                                label='dark bg color'
                                value={item.darkBgColor}
                                onChange={(e) => {
                                    setItem((prev) => ({ ...prev, darkBgColor: e.target.value }));
                                }}
                            />
                            <ColorPicker
                                label='dark text color'
                                value={item.darkFontColor}
                                onChange={(e) => {
                                    setItem((prev) => ({ ...prev, darkFontColor: e.target.value }));
                                }}
                            />
                            <div className='grid grid-cols-2 items-center justify-between gap-4 mt-4'>
                                <HeaderButton text='cancel' onClick={handleCancel} />
                                {mode === 'ADD' && (
                                    <HeaderButton
                                        text='ADD'
                                        onClick={handleAdd}
                                        customStyle='hover:bg-green-500 hover:border-transparent active:border-green-900'
                                    />
                                )}
                                {mode === 'EDIT' && (
                                    <HeaderButton
                                        text='delete'
                                        onClick={handleDelete}
                                        customStyle='hover:bg-red-500 hover:border-transparent active:border-red-900'
                                    />
                                )}
                                {mode === 'EDIT' && (
                                    <HeaderButton
                                        text='commit'
                                        onClick={handleCommit}
                                        customStyle='hover:bg-green-500 hover:border-transparent active:border-green-900 col-span-2'
                                    />
                                )}
                            </div>
                        </div>
                        <hr />
                        <CategoryEditorPreview item={item} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
