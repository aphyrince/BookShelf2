interface Book {
    id: string;
    title: string;
    author?: string;
    readAt?: Date;
    updatedAt?: Date;
    comment?: string;
    count?: number;
    rating?: number;
}
