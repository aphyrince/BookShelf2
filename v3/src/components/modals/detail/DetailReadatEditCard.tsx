import { setDetailPartialItem, useModalStore } from '@/src/hooks/useModal';
import React, { useCallback } from 'react';

const DetailReadatEditCard = () => {
    const readAt = useModalStore((s) => s.bookDetail?.readAt);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, idx: number) => {
            if (!readAt) return;
            const changed = readAt.map((elem, i) => (i === idx ? e.target.value : elem));
            setDetailPartialItem({ readAt: changed });
        },
        [readAt],
    );

    return (
        <div className='grid grid-cols-2'>
            <p className='uppercase'>read at</p>
            <div className='flex flex-col gap-2'>
                {readAt &&
                    readAt
                        .sort()
                        .reverse()
                        .map((elem, idx) => (
                            <input
                                key={elem}
                                type='date'
                                value={elem.slice(0, 10)}
                                onChange={(e) => handleChange(e, idx)}
                                className='outline outline-slate-500 px-2 py-1 rounded-lg
                            focus:bg-slate-100 active:bg-slate-100
                            dark:focus:bg-slate-700 dark:active:bg-slate-700
                            duration-200'
                            />
                        ))}
            </div>
        </div>
    );
};

export default DetailReadatEditCard;
