import React from 'react';

interface Props {
    text: string;
    onClick: () => void;
    customStyle?: string;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
}

const HeaderButton = ({ text, onClick, customStyle, disabled, type = 'button' }: Props) => {
    return (
        <button
            className={`p-2 text-[0.6rem] md:px-4 md:py-2 md:text-sm rounded-md bg-transparent border-slate-600 dark:border-slate-400 border 
                uppercase font-bold cursor-pointer duration-200 
                hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${customStyle}`}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};

export default React.memo(HeaderButton);
