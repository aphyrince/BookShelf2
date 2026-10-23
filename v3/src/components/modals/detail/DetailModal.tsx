'use client';

import { setDetail2Prev, setDetailItem, setModalMode, setPrevBookDetail, useModalStore } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import React, { useCallback, useMemo, useState } from 'react';

import { getCategoryById, useCategoryStore } from '@/src/hooks/useCategoryStore';
import { deleteBook, refreshBook, updateBook } from '@/src/hooks/useBookStore';
import { useAdminStore } from '@/src/hooks/useAdminStore';
import DetailItemCard from './DetailItemCard';
import CategoryCard from '../../CategoryCard';
import DetailEditCard from './DetailEditCard';
import DetailCategoryEditor from './DetailCategoryEditor';

const DetailModal = () => {
    const item = useModalStore((s) => s.bookDetail) as BookDTO;
    const [editMode, setEditMode] = useState(false);
    const categories = useCategoryStore((s) => s.categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const categoryItem = useMemo(() => getCategoryById(item.category), [item.category, categories]);
    const isAdmin = useAdminStore((s) => s.login);
    const [showCategoryList, setShowCategoryList] = useState(false);

    const closeModal = useCallback((e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.stopPropagation();
        setModalMode('NONE');
        setDetailItem(null);
        setPrevBookDetail(null);
    }, []);

    const handleModalClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setShowCategoryList(false);
    }, []);

    const handleEditClick = useCallback(() => {
        if (!isAdmin) return;
        setEditMode(true);
    }, [isAdmin]);

    const handleCancel = useCallback(() => {
        setEditMode(false);
        setDetail2Prev();
    }, []);

    const handleDelete = useCallback(() => {
        if (confirm('삭제하시겠습니까?')) {
            deleteBook(item.id);
            refreshBook();
            closeModal();
        }
    }, [closeModal, item.id]);

    const handleCommit = useCallback(() => {
        setDetailItem(item);
        updateBook(item.id, item);
        refreshBook();
        setEditMode(false);
    }, [item]);

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
                {/* 디테일 헤더 */}
                <div className='flex items-center gap-4'>
                    <p className='flex-1 text-2xl '>Detail</p>
                    {editMode && (
                        <HeaderButton
                            text='delete'
                            onClick={handleDelete}
                            customStyle='hover:bg-red-500 hover:border-transparent active:border-red-900'
                        />
                    )}
                    {editMode && (
                        <HeaderButton
                            text='commit'
                            onClick={handleCommit}
                            customStyle='hover:bg-green-500 hover:border-transparent active:border-green-900 col-span-2'
                        />
                    )}
                    {editMode && <HeaderButton text='cancel' onClick={handleCancel} />}
                    {isAdmin && !editMode && <HeaderButton text='edit' onClick={handleEditClick} />}

                    <HeaderButton text='X' onClick={closeModal} />
                </div>
                <hr />
                <div className='flex flex-col gap-2'>
                    {editMode ? <DetailEditCard label='title' /> : <DetailItemCard label='title' text={item.title} />}
                    {editMode ? (
                        <DetailEditCard label='author' />
                    ) : (
                        <DetailItemCard label='author' text={item.author} />
                    )}
                    <div className='grid grid-cols-2 relative'>
                        <p className='uppercase'>category</p>
                        <div className='flex'>
                            {categoryItem && (
                                <CategoryCard
                                    item={categoryItem}
                                    customStyle=' truncate mr-auto cursor-pointer'
                                    onClick={(e) => {
                                        e?.stopPropagation();
                                        setShowCategoryList((prev) => !prev);
                                    }}
                                />
                            )}
                            {editMode && categories && (
                                <DetailCategoryEditor
                                    categories={categories}
                                    show={showCategoryList}
                                    onClose={() => setShowCategoryList(false)}
                                />
                            )}
                            {/* <div className='absolute top-0 right-0 size-50 bg-slate-50 overflow-auto border rounded-xl p-2 flex flex-col gap-2 items-center'>
                            {categories?.map((category) => (
                                <CategoryCard key={category.id} item={category} />
                            ))}
                        </div> */}
                        </div>
                    </div>
                    {editMode ? (
                        <DetailEditCard label='count' type='number' />
                    ) : (
                        <DetailItemCard label='count' text={item.count} />
                    )}
                    {editMode ? (
                        <DetailEditCard label='rating' type='number' />
                    ) : (
                        <DetailItemCard label='rating' text={item.rating} />
                    )}
                    {editMode ? (
                        <DetailEditCard label='readAt' type='date' />
                    ) : (
                        <DetailItemCard label='read at' text={item.readAt.slice(0, 10)} />
                    )}
                    {editMode ? (
                        <DetailEditCard label='createAt' type='date' />
                    ) : (
                        <DetailItemCard label='create at' text={item.createAt.slice(0, 10)} />
                    )}
                    {editMode ? (
                        <DetailEditCard label='updatedAt' type='date' />
                    ) : (
                        <DetailItemCard label='updated at' text={item.updatedAt.slice(0, 10)} />
                    )}
                    {editMode ? (
                        <DetailEditCard label='comment' custumStyle='flex flex-col gap-2' textarea />
                    ) : (
                        <div className='flex flex-col gap-2'>
                            <p className='uppercase'>comment</p>
                            <p>{item.comment}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
