import { setModalMode } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import React, { useCallback } from 'react';

const CategoryModal = () => {
    const closeModal = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setModalMode('NONE');
    }, []);

    const handleModalClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    }, []);

    return (
        <div className='absolute inset-0 flex justify-center items-center bg-black/50' onClick={closeModal}>
            <div
                className='absolute top-30 flex flex-col gap-4 bg-slate-50 dark:bg-slate-900 dark:border dark:border-white w-4/5 min-w-100 p-4 md:p-8 rounded-xl'
                onClick={handleModalClick}
            >
                {/* 카테고리 헤더 */}
                <div className='flex items-center gap-4 '>
                    <p className='flex-1 text-2xl '>Category</p>
                    <HeaderButton text='ADD Category' onClick={() => {}} />
                    <HeaderButton text='X' onClick={() => setModalMode('NONE')} />
                </div>
                <hr />
                <div>
                    {/* 카테고리 카드 */}
                    <div>컴퓨터과학</div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
