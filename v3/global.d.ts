interface Book {
    title: string;
    author?: string;
    readAt?: Date;
    updatedAt?: Date;
    createdAt?: Date;
    comment?: string;
    count?: number;
    rating?: number;
}

// API는 ObjectId와 Date 대신 JSON으로 전달할 수 있는 값을 반환합니다.
interface BookDTO {
    id: string;
    title: string;
    author: string;
    readAt: string;
    createAt: string;
    updatedAt: string;
    comment: string;
    count: number;
    rating: number;
}
