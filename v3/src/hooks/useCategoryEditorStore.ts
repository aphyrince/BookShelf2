import { create } from 'zustand';

interface CategoryEditorState {
    mode: CategoryEditMode;
    item: CategoryDTO;
}

export const useCategoryEditorStore = create<CategoryEditorState>()(() => ({
    mode: 'ADD',
    item: {
        id: '',
        text: '',
        bgColor: '#aaaaaa',
        fontColor: '#000000',
        darkBgColor: '#353232',
        darkFontColor: '#fffcfc',
    },
}));

export function setCategoryEditorItem(item: CategoryDTO) {
    useCategoryEditorStore.setState({ item });
}

export function setCategoryEditorMode(mode: CategoryEditMode) {
    useCategoryEditorStore.setState({ mode });
}
