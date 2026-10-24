'use client';

import { addBook, refreshBook } from '@/src/hooks/useBookStore';
import { setModalMode } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import { useCallback, useState } from 'react';
import CategoryCard from '../../CategoryCard';
import CategorySelector from '../../CategorySelector';

const AddBookModal = () => {
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    const [categoryItem, setCategoryItem] = useState<CategoryDTO | null>(null);
    const [item, setItem] = useState<Book>({
        title: '',
        author: '',
        category: '',
        comment: '',
        count: 0,
        rating: 0,
        readAt: new Date(),
    });

    const closeModal = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();
        setModalMode('NONE');
    }, []);

    const handleModalClick = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();
        setShowCategorySelector(false);
    }, []);

    const handleAddClick = useCallback(() => {
        if (item.title === '') {
            alert('제목을 입력해야 합니다.');
            return;
        }
        addBook(item);
        refreshBook();
        closeModal();
    }, [item, closeModal]);

    return (
        <div className='absolute inset-0 flex justify-center items-center bg-black/50' onClick={closeModal}>
            <div
                className='fixed top-1/2 left-1/2 -translate-1/2 
                           flex flex-col gap-2 md:gap-4
                           max-w-200 w-4/5 min-w-100 p-4 md:p-8 
                          bg-slate-50 dark:bg-slate-900 dark:border dark:border-white
                           rounded-xl overflow-hidden'
                onClick={handleModalClick}
            >
                {/* 헤더 */}
                <div className='flex items-center gap-4'>
                    <p className='flex-1 text-2xl'>Add Book</p>
                    <HeaderButton text='X' onClick={closeModal} />
                </div>
                <hr />
                <div className='flex flex-col gap-2'>
                    <div className='grid grid-cols-2'>
                        <p className='uppercase'>title</p>
                        <input
                            type='text'
                            value={item.title}
                            onChange={(e) => setItem((prev) => ({ ...prev, title: e.target.value }))}
                            className='outline outline-slate-500 px-2 py-1 rounded-lg
                                        focus:bg-slate-200 active:bg-slate-200
                                        focus:outline-black active:outline-black
                                        dark:focus:bg-slate-700 dark:active:bg-slate-700
                                        dark:focus:outline-white dark:active:outline-white
                                            duration-200'
                        />
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='uppercase'>author</p>
                        <input
                            type='text'
                            value={item.author}
                            onChange={(e) => setItem((prev) => ({ ...prev, author: e.target.value }))}
                            className='outline outline-slate-500 px-2 py-1 rounded-lg
                                        focus:bg-slate-200 active:bg-slate-200
                                        focus:outline-black active:outline-black
                                        dark:focus:bg-slate-700 dark:active:bg-slate-700
                                        dark:focus:outline-white dark:active:outline-white
                                            duration-200'
                        />
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='uppercase'>category</p>
                        <div className='flex' onClick={(e) => e.stopPropagation()}>
                            {categoryItem ? (
                                <CategoryCard
                                    item={categoryItem}
                                    onClick={() => {
                                        setShowCategorySelector((prev) => !prev);
                                    }}
                                    customStyle='cursor-pointer'
                                />
                            ) : (
                                <HeaderButton
                                    text='select category'
                                    onClick={() => {
                                        setShowCategorySelector((prev) => !prev);
                                    }}
                                />
                            )}
                            <CategorySelector
                                show={showCategorySelector}
                                onClose={() => setShowCategorySelector(false)}
                                onSelect={(category) => {
                                    setCategoryItem(category);
                                    setItem((prev) => ({ ...prev, category: category.id }));
                                }}
                                custumStyle='flex-1'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='uppercase'>count</p>
                        <input
                            type='number'
                            value={item.count}
                            onChange={(e) => setItem((prev) => ({ ...prev, count: e.target.valueAsNumber }))}
                            className='outline outline-slate-500 px-2 py-1 rounded-lg
                                        focus:bg-slate-200 active:bg-slate-200
                                        focus:outline-black active:outline-black
                                        dark:focus:bg-slate-700 dark:active:bg-slate-700
                                        dark:focus:outline-white dark:active:outline-white
                                            duration-200'
                        />
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='uppercase'>rating</p>
                        <input
                            type='number'
                            value={item.rating}
                            max={5}
                            step={0.5}
                            min={0}
                            onChange={(e) => setItem((prev) => ({ ...prev, rating: e.target.valueAsNumber }))}
                            className='outline outline-slate-500 px-2 py-1 rounded-lg
                                        focus:bg-slate-200 active:bg-slate-200
                                        focus:outline-black active:outline-black
                                        dark:focus:bg-slate-700 dark:active:bg-slate-700
                                        dark:focus:outline-white dark:active:outline-white
                                            duration-200'
                        />
                    </div>
                    <div className='grid grid-cols-2'>
                        <p className='uppercase'>read at</p>
                        <input
                            type='date'
                            value={(item.readAt as Date).toISOString().slice(0, 10)}
                            onChange={(e) => {
                                if (!e.target.valueAsDate) return;
                                setItem((prev) => ({ ...prev, readAt: e.target.valueAsDate || prev.readAt }));
                            }}
                            className='outline outline-slate-500 px-2 py-1 rounded-lg
                                        focus:bg-slate-200 active:bg-slate-200
                                        focus:outline-black active:outline-black
                                        dark:focus:bg-slate-700 dark:active:bg-slate-700
                                        dark:focus:outline-white dark:active:outline-white
                                            duration-200'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='uppercase'>comment</p>
                        <textarea
                            value={item.comment}
                            onChange={(e) => setItem((prev) => ({ ...prev, comment: e.target.value }))}
                            className='outline outline-slate-500 p-2 md:p-4 rounded-lg
                                        focus:bg-slate-200 active:bg-slate-200
                                        focus:outline-black active:outline-black
                                        dark:focus:bg-slate-700 dark:active:bg-slate-700
                                        dark:focus:outline-white dark:active:outline-white
                                            duration-200'
                        />
                    </div>
                    <HeaderButton
                        text='add'
                        onClick={handleAddClick}
                        customStyle='mt-2 ml-auto hover:bg-green-500 hover:border-transparent hover:dark:bg-green-600 hover:dark:text-white'
                    />
                </div>
            </div>
        </div>
    );
};

export default AddBookModal;
