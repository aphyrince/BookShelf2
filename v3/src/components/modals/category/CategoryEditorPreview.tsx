import CategoryCard from '../../CategoryCard';
import { useCategoryEditorStore } from '@/src/hooks/useCategoryEditorStore';

const CategoryEditorPreview = () => {
    const item = useCategoryEditorStore((s) => s.item);
    return (
        <div>
            <p className='italic text-sm'>Preview</p>
            <div className='w-full h-25 bg-slate-50 flex justify-center items-center'>
                {item.text && (
                    <CategoryCard item={{ ...item, darkBgColor: item.bgColor, darkFontColor: item.fontColor }} />
                )}
            </div>
            <div className='w-full h-25 bg-slate-800 flex justify-center items-center'>
                {item.text && (
                    <CategoryCard item={{ ...item, bgColor: item.darkBgColor, fontColor: item.darkFontColor }} />
                )}
            </div>
        </div>
    );
};

export default CategoryEditorPreview;
