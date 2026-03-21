export type BookStatus = "완료" | "읽는 중" | "포기함";

export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    status: BookStatus;
    readAt: string[]; // 다 읽은 날짜들을 담는 배열
    comment: string;
}
