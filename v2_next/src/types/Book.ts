import { BookStatus } from "./Status";

export interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    status: BookStatus;
    readAt: string[]; // 다 읽은 날짜들을 담는 배열
    comment: string;
}
