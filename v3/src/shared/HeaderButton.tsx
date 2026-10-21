import React from 'react';

interface Props {
    text: string;
    onClick: () => void;
    customStyle?: string;
}

const HeaderButton = ({ text, onClick, customStyle }: Props) => {
    return (
        <button
            className={`px-4 py-2 rounded-md bg-transparent border-slate-600 dark:border-slate-400 border text-sm uppercase font-bold cursor-pointer duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black ${customStyle}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default React.memo(HeaderButton);
