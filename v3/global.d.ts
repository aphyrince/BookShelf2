interface Book {
    title: string;
    author?: string;
    readAt?: Date[];
    updatedAt?: Date;
    createdAt?: Date;
    comment?: string;
    count?: number;
    rating?: number;
    category?: string;
}

// API는 ObjectId와 Date 대신 JSON으로 전달할 수 있는 값을 반환합니다.
interface BookDTO {
    id: string;
    title: string;
    author: string;
    readAt: string[];
    createAt: string;
    updatedAt: string;
    comment: string;
    count: number;
    rating: number;
    category: string;
}

type MODALS = 'NONE' | 'CATEGORY' | 'ADD' | 'DETAIL';

interface CategoryDTO {
    id: string;
    text: string;
    bgColor: string;
    darkBgColor: string;
    fontColor: string;
    darkFontColor: string;
}

interface Category {
    text: string;
    bgColor: string;
    darkBgColor: string;
    fontColor: string;
    darkFontColor: string;
}

type CategoryEditMode = 'ADD' | 'EDIT';
