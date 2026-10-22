import React from 'react';
import CategoryCard from '../../CategoryCard';

const CategoryEditorPreview = ({ text, bgColor, fontColor, darkBgColor, darkFontColor }: CategoryDTO) => {
    return (
        <div>
            <p className='italic text-sm'>Preview</p>
            <div className='w-full h-25 bg-slate-50 flex justify-center items-center'>
                {text && (
                    <CategoryCard
                        item={{
                            id: 'temp1',
                            text: text,
                            bgColor,
                            darkBgColor: bgColor,
                            fontColor,
                            darkFontColor: fontColor,
                        }}
                    />
                )}
            </div>
            <div className='w-full h-25 bg-slate-800 flex justify-center items-center'>
                {text && (
                    <CategoryCard
                        item={{
                            id: 'temp2',
                            text,
                            bgColor: darkBgColor,
                            darkBgColor,
                            fontColor: darkFontColor,
                            darkFontColor,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default CategoryEditorPreview;
