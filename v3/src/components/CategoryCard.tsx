import React from 'react';

interface Props {
    item: CategoryDTO;
    onClick?: () => void;
    customStyle?: string;
}

const CategoryCard = ({ item, onClick, customStyle = '' }: Props) => {
    const style: React.CSSProperties & {
        '--category-bg': string;
        '--category-font': string;
        '--category-dark-bg': string;
        '--category-dark-font': string;
    } = {
        '--category-bg': item.bgColor,
        '--category-font': item.fontColor,
        '--category-dark-bg': item.darkBgColor,
        '--category-dark-font': item.darkFontColor,
    };

    return (
        <div
            className={`px-2 py-1 text-center rounded-xl
                       bg-(--category-bg) text-(--category-font) 
                       dark:bg-(--category-dark-bg) 
                       dark:text-(--category-dark-font) 
                       ${customStyle}`}
            style={style}
            onClick={onClick}
        >
            {item.text}
        </div>
    );
};

export default React.memo(CategoryCard);
