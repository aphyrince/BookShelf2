import { addCategory, updateCategory, useCategoryStore } from '@/src/hooks/useCategoryStore';
import { setModalMode } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import React, { useCallback, useState } from 'react';
import CategoryCard from '../CategoryCard';

const CategoryModal = () => {
    const categories = useCategoryStore((s) => s.categories);

    const [mode, setMode] = useState<'ADD' | 'EDIT'>('ADD');

    const [id, setId] = useState('');

    const [name, setName] = useState('');
    const [bgColor, setBgColor] = useState('#aaaaaa');
    const [fontColor, setFontColor] = useState('#000000');
    const [darkBgColor, setDarkBgColor] = useState('#353232');
    const [darkFontColor, setDarkFontColor] = useState('#fffcfc');

    const closeModal = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
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
            setId(item.id);
            setName(item.text);
            setBgColor(item.bgColor);
            setDarkBgColor(item.darkBgColor);
            setFontColor(item.fontColor);
            setDarkFontColor(item.darkFontColor);
        },
        [setEditMode],
    );

    const handleCancel = useCallback(() => {
        setAddMode();
        setName('');
        setId('');
    }, [setAddMode, setId]);

    const handleAdd = useCallback(() => {
        addCategory({
            text: name,
            bgColor,
            darkBgColor,
            fontColor,
            darkFontColor,
        });
        handleCancel();
    }, [handleCancel, name, bgColor, fontColor, darkBgColor, darkFontColor]);

    const handleCommit = useCallback(() => {
        updateCategory(id, { text: name, bgColor, darkBgColor, fontColor, darkFontColor });
        handleCancel();
    }, [handleCancel, id, name, bgColor, fontColor, darkBgColor, darkFontColor]);

    return (
        <div className='absolute inset-0 flex justify-center items-center bg-black/50' onClick={closeModal}>
            <div
                className='absolute top-30 flex flex-col gap-4 bg-slate-50 dark:bg-slate-900 dark:border dark:border-white min-w-100 h-[75vh] p-4 md:p-8 rounded-xl overflow-hidden'
                onClick={handleModalClick}
            >
                {/* 카테고리 헤더 */}
                <div className='flex items-center gap-4 '>
                    <p className='flex-1 text-2xl '>Category</p>
                    <HeaderButton text='X' onClick={() => setModalMode('NONE')} />
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className='flex justify-between gap-4'>
                                <p className='uppercase'>bg color</p>
                                <input
                                    type='color'
                                    value={bgColor}
                                    onChange={(e) => {
                                        setBgColor(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='flex justify-between gap-4'>
                                <p className='uppercase'>text color</p>
                                <input
                                    type='color'
                                    value={fontColor}
                                    onChange={(e) => {
                                        setFontColor(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='flex justify-between gap-4'>
                                <p className='uppercase'>dark bg color</p>
                                <input
                                    type='color'
                                    value={darkBgColor}
                                    onChange={(e) => {
                                        setDarkBgColor(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='flex justify-between gap-4'>
                                <p className='uppercase'>dark text color</p>
                                <input
                                    type='color'
                                    value={darkFontColor}
                                    onChange={(e) => {
                                        setDarkFontColor(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='flex items-center justify-between gap-4 mt-4'>
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
                                        text='commit'
                                        onClick={handleCommit}
                                        customStyle='hover:bg-green-500 hover:border-transparent active:border-green-900'
                                    />
                                )}
                            </div>
                        </div>
                        <hr />
                        <div>
                            <p className='italic text-sm'>Preview</p>
                            <div className='w-full h-25 bg-slate-50 flex justify-center items-center'>
                                {name && (
                                    <CategoryCard
                                        item={{
                                            id: 'temp1',
                                            text: name,
                                            bgColor,
                                            darkBgColor: bgColor,
                                            fontColor,
                                            darkFontColor: fontColor,
                                        }}
                                    />
                                )}
                            </div>
                            <div className='w-full h-25 bg-slate-800 flex justify-center items-center'>
                                {name && (
                                    <CategoryCard
                                        item={{
                                            id: 'temp2',
                                            text: name,
                                            bgColor: darkBgColor,
                                            darkBgColor,
                                            fontColor: darkFontColor,
                                            darkFontColor,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
