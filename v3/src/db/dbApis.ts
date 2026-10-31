import 'server-only';
import { ObjectId, WithId } from 'mongodb';
import clientPromise from './mongodb';

const DB_NAME = process.env.DB_NAME as string;
const COLLECTION_NAME = process.env.COLLECTION_NAME as string;

function dateToISOString(value?: Date | string | null): string {
    if (!value) return '';

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        throw new Error('책 데이터에 올바르지 않은 날짜가 있습니다.');
    }

    return date.toISOString();
}

export function parseWithIdBook2DTO(book: WithId<Book>): BookDTO {
    const storedReadAt = book.readAt as Date[] | Date | string | null | undefined;
    const readAt = Array.isArray(storedReadAt) ? storedReadAt : storedReadAt ? [storedReadAt] : [];

    return {
        id: book._id.toString(),
        title: book.title,
        author: book.author || '',
        readAt: readAt.map((item) => dateToISOString(item)),
        createAt: dateToISOString(book.createdAt),
        updatedAt: dateToISOString(book.updatedAt),
        comment: book.comment || '',
        count: book.count || 1,
        rating: book.rating || 0,
        category: book.category || '',
    };
}

export function parseBookDTO2Book(dto: BookDTO): Book {
    return {
        title: dto.title,
        author: dto.author,
        readAt: dto.readAt.length ? dto.readAt.map((item) => new Date(item)) : undefined,
        createdAt: dto.createAt ? new Date(dto.createAt) : undefined,
        updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
        comment: dto.comment,
        count: dto.count,
        rating: dto.rating,
        category: dto.category,
    };
}

async function getBooksCollection() {
    const client = await clientPromise;
    return client.db(DB_NAME).collection<Book>(COLLECTION_NAME);
}

// 책 추가함. 추가된 책의 _id를 return
export async function createBook(book: Book): Promise<string> {
    const now = new Date();
    const result = await (
        await getBooksCollection()
    ).insertOne({
        ...book,
        updatedAt: now,
        createdAt: now,
    });

    return result.insertedId.toString();
}

// 책 목록 불러오기
export async function getBooks(): Promise<WithId<Book>[]> {
    return (await getBooksCollection()).find({}).sort({ readAt: -1 }).toArray();
}

// ID로 책 한 권 불러오기.
export async function getBookById(id: string): Promise<WithId<Book> | null> {
    if (!ObjectId.isValid(id)) {
        throw new Error('올바르지 않은 책 ID 입니다.');
    }

    return (await getBooksCollection()).findOne({ _id: new ObjectId(id) });
}

// 책 정보 수정하기
export async function updateBook(id: string, book: Book): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
        throw new Error('올바르지 않은 책 ID 입니다.');
    }

    const result = await (
        await getBooksCollection()
    ).updateOne({ _id: new ObjectId(id) }, { $set: { ...book, updatedAt: new Date() } });

    return result.matchedCount > 0;
}

// 책 삭제하기.
// 해당 ID의 문서가 실제로 삭제되었는지 return.
export async function deleteBook(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
        throw new Error('올바르지 않은 책 ID 입니다.');
    }

    const result = await (
        await getBooksCollection()
    ).deleteOne({
        _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
}
