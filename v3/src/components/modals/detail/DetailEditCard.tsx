import { setDetailPartialItem, useModalStore } from '@/src/hooks/useModal';
import React, { useCallback } from 'react';

interface Props {
    label: keyof BookDTO;
    custumStyle?: string;
    type?: React.HTMLInputTypeAttribute;
}

const DetailEditCard = ({ label, custumStyle = '', type }: Props) => {
    const value = useModalStore((s) => s.bookDetail?.[label]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            setDetailPartialItem({ [label]: e.target.value });
        },
        [label],
    );

    return (
        <div className={`grid grid-cols-2 ${custumStyle}`}>
            <p className='uppercase'>{label}</p>
            <input type={type} value={value} onChange={handleChange} />
        </div>
    );
};

export default DetailEditCard;
