import 'server-only';
import { ObjectId, WithId } from 'mongodb';
import clientPromise from './mongodb';

const DB_NAME = process.env.DB_NAME as string;
const COLLECTION_NAME = process.env.COLLECTION_NAME as string;

export function parseWithIdBook2DTO(book: WithId<Book>): BookDTO {
    return {
        id: book._id.toString(),
        title: book.title,
        author: book.author || '',
        readAt: book.readAt?.toISOString() || '',
        createAt: book.createdAt?.toISOString() || '',
        updatedAt: book.updatedAt?.toISOString() || '',
        comment: book.comment || '',
        count: book.count || 1,
        rating: book.rating || 0,
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
    return (await getBooksCollection()).find({}).sort({ createdAt: -1 }).toArray();
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
