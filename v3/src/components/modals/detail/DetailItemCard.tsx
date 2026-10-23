import React from 'react';

interface Props {
    label: string;
    text: string | number;
    custumStyle?: string;
}

const DetailItemCard = ({ label, text, custumStyle = '' }: Props) => {
    return (
        <div className={`grid grid-cols-2 ${custumStyle}`}>
            <p className='uppercase'>{label}</p>
            <p>{text}</p>
        </div>
    );
};

export default DetailItemCard;
