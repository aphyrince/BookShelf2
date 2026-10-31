import { setDetailPartialItem, useModalStore } from '@/src/hooks/useModal';
import HeaderButton from '@/src/shared/HeaderButton';
import React, { useCallback, useState } from 'react';

const DetailReadatEditor = () => {
    const readAt = useModalStore((s) => s.bookDetail?.readAt);
    const [addMode, setAddMode] = useState(false);
    const [date, setDate] = useState(new Date().toISOString());

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, prevValue: string) => {
            if (!readAt) return;
            const changed = readAt.map((elem) => (elem === prevValue ? e.target.value : elem));
            setDetailPartialItem({ readAt: changed });
        },
        [readAt],
    );

    const handleAddDateClick = useCallback(() => {
        setDate(new Date().toISOString());
        setAddMode(true);
    }, []);

    const handleAddDate2ReadAt = useCallback(() => {
        if (!readAt) return;
        const changed = [...readAt, date].sort().reverse();
        setDetailPartialItem({ readAt: changed });
        setAddMode(false);
    }, [date, readAt]);

    const handleDeleteDateClick = useCallback(
        (targetValue: string) => {
            const changed = readAt?.filter((elem) => elem !== targetValue);
            setDetailPartialItem({ readAt: changed });
        },
        [readAt],
    );

    return (
        <div className='grid grid-cols-2'>
            <p className='uppercase'>read at</p>
            <div className='flex flex-col gap-2'>
                {addMode ? (
                    <div className='flex gap-2'>
                        <input
                            type='date'
                            className='flex-1 outline outline-slate-500 px-2 py-1 rounded-lg
                            focus:bg-slate-100 active:bg-slate-100
                            dark:focus:bg-slate-700 dark:active:bg-slate-700
                            duration-200'
                            value={date.slice(0, 10)}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                        />
                        <HeaderButton text='+' onClick={handleAddDate2ReadAt} />
                    </div>
                ) : (
                    <HeaderButton text='+' onClick={handleAddDateClick} />
                )}

                {readAt &&
                    readAt
                        .sort()
                        .reverse()
                        .map((elem) => (
                            <div key={elem} className='flex gap-2'>
                                <input
                                    type='date'
                                    value={elem.slice(0, 10)}
                                    onChange={(e) => handleChange(e, elem)}
                                    className='flex-1 outline outline-slate-500 px-2 py-1 rounded-lg
                            focus:bg-slate-100 active:bg-slate-100
                            dark:focus:bg-slate-700 dark:active:bg-slate-700
                            duration-200'
                                />
                                <HeaderButton text='-' onClick={() => handleDeleteDateClick(elem)} />
                            </div>
                        ))}
            </div>
        </div>
    );
};

export default DetailReadatEditor;
