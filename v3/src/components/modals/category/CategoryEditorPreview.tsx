import CategoryCard from '../../CategoryCard';
import { useCategoryEditorStore } from '@/src/hooks/useCategoryEditorStore';

const CategoryEditorPreview = () => {
    const item = useCategoryEditorStore((s) => s.item);
    return (
        <div className='flex-1 flex flex-col gap-2'>
            <p className='italic text-sm'>Preview</p>
            <div className='flex-1 flex not-md:flex-col'>
                <div className='flex-1 p-4 bg-slate-50 flex justify-center items-center'>
                    {item.text && (
                        <CategoryCard item={{ ...item, darkBgColor: item.bgColor, darkFontColor: item.fontColor }} />
                    )}
                </div>
                <div className='flex-1 p-4 bg-slate-800 flex justify-center items-center'>
                    {item.text && (
                        <CategoryCard item={{ ...item, bgColor: item.darkBgColor, fontColor: item.darkFontColor }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryEditorPreview;
