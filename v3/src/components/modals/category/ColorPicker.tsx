import React from 'react';

interface Props {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

const ColorPicker = ({ label, value, onChange }: Props) => {
    return (
        <div className='flex justify-between gap-4'>
            <p className='uppercase'>{label}</p>
            <input type='color' value={value} onChange={onChange} />
        </div>
    );
};

export default ColorPicker;
