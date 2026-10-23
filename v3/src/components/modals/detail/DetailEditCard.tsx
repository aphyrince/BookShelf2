import { setDetailPartialItem, useModalStore } from '@/src/hooks/useModal';
import React, { HTMLAttributes, useCallback } from 'react';

interface Props {
    label: keyof BookDTO;
    custumStyle?: string;
    type?: React.HTMLInputTypeAttribute;
    textarea?: true;
}

const DetailEditCard = ({ label, custumStyle = '', type, textarea }: Props) => {
    const value = useModalStore((s) => s.bookDetail?.[label]);

    const handleChange = useCallback(
        (
            e:
                | React.ChangeEvent<HTMLInputElement, HTMLInputElement>
                | React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
        ) => {
            setDetailPartialItem({ [label]: e.target.value });
        },
        [label],
    );

    return (
        // <div className={`grid grid-cols-2 ${custumStyle}`}>
        <div className={custumStyle === '' ? 'grid grid-cols-2' : custumStyle}>
            <p className='uppercase'>{label}</p>
            {textarea ? (
                <textarea
                    value={value}
                    onChange={handleChange}
                    className='outline outline-slate-500 px-2 py-1 rounded-lg
                            focus:bg-slate-100 active:bg-slate-100
                            dark:focus:bg-slate-700 dark:active:bg-slate-700
                            duration-200'
                />
            ) : type && type === 'date' ? (
                <input
                    type='date'
                    value={(value as string).slice(0, 10)}
                    onChange={handleChange}
                    className='outline outline-slate-500 px-2 py-1 rounded-lg
                            focus:bg-slate-100 active:bg-slate-100
                            dark:focus:bg-slate-700 dark:active:bg-slate-700
                            duration-200'
                />
            ) : label === 'rating' ? (
                <input
                    type={type}
                    value={value}
                    max={5}
                    step={0.5}
                    min={0}
                    onChange={handleChange}
                    className='outline outline-slate-500 px-2 py-1 rounded-lg focus:bg-slate-100 active:bg-slate-100 dark:focus:bg-slate-700 dark:active:bg-slate-700 duration-200'
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    className='outline outline-slate-500 px-2 py-1 rounded-lg focus:bg-slate-100 active:bg-slate-100 dark:focus:bg-slate-700 dark:active:bg-slate-700 duration-200'
                />
            )}
        </div>
    );
};

export default DetailEditCard;
