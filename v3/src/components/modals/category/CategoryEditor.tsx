import React, { useCallback } from 'react';
import ColorPicker from './ColorPicker';
import HeaderButton from '@/src/shared/HeaderButton';
import CategoryEditorPreview from './CategoryEditorPreview';
import { addCategory, deleteCategory, updateCategory } from '@/src/hooks/useCategoryStore';
import {
    setCategoryEditorItem,
    setCategoryEditorMode,
    useCategoryEditorStore,
} from '@/src/hooks/useCategoryEditorStore';

const CategoryEditor = () => {
    const mode = useCategoryEditorStore((s) => s.mode);
    const item = useCategoryEditorStore((s) => s.item);

    const handleCancel = useCallback(() => {
        setCategoryEditorMode('ADD');
        setCategoryEditorItem({
            id: '',
            text: '',
            bgColor: '#aaaaaa',
            fontColor: '#000000',
            darkBgColor: '#353232',
            darkFontColor: '#fffcfc',
        });
    }, []);

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
        <div className='flex-2 flex flex-col box-border p-4 gap-4 justify-between h-full border border-black dark:border-white rounded-3xl not-md:text-sm'>
            <div className='flex flex-col gap-4'>
                <input
                    className='outline outline-slate-400 p-1 rounded-lg active:outline-slate-700 focus:outline-slate-700 duration-200'
                    placeholder='category name'
                    type='text'
                    value={item.text}
                    onChange={(e) => {
                        setCategoryEditorItem({ ...item, text: e.target.value });
                    }}
                />
                <ColorPicker
                    label='bg Color'
                    value={item.bgColor}
                    onChange={(e) => {
                        setCategoryEditorItem({ ...item, bgColor: e.target.value });
                    }}
                />
                <ColorPicker
                    label='text color'
                    value={item.fontColor}
                    onChange={(e) => {
                        setCategoryEditorItem({ ...item, fontColor: e.target.value });
                    }}
                />
                <ColorPicker
                    label='dark bg color'
                    value={item.darkBgColor}
                    onChange={(e) => {
                        setCategoryEditorItem({ ...item, darkBgColor: e.target.value });
                    }}
                />
                <ColorPicker
                    label='dark text color'
                    value={item.darkFontColor}
                    onChange={(e) => {
                        setCategoryEditorItem({ ...item, darkFontColor: e.target.value });
                    }}
                />
                <div className='grid grid-cols-2 items-center justify-between gap-4'>
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
            <CategoryEditorPreview />
        </div>
    );
};

export default CategoryEditor;
