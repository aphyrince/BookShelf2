import { deleteBook, getBookById, parseWithIdBook2DTO, updateBook } from '@/src/db/dbApis';
import { ObjectId } from 'mongodb';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: '올바르지 않은 책 ID입니다.' }, { status: 400 });
    }

    try {
        const book = await getBookById(id);
        if (!book) {
            return Response.json({ error: '책을 찾을 수 없습니다.' }, { status: 404 });
        }

        const response: BookDTO = parseWithIdBook2DTO(book);
        return Response.json(response);
    } catch (error) {
        console.error('책을 불러오지 못했습니다.', error);
        return Response.json({ error: '책을 불러오지 못했습니다.' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: RouteContext) {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: '올바르지 않은 책 ID입니다.' }, { status: 400 });
    }

    let book: Book;
    try {
        book = (await request.json()) as Book;
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
        }
        throw error;
    }

    try {
        const found = await updateBook(id, book);
        if (!found) {
            return Response.json({ error: '책을 찾을 수 없습니다.' }, { status: 404 });
        }

        const renewBook = await getBookById(id);
        if (!renewBook) {
            return Response.json({ error: '책을 찾을 수 없습니다.' }, { status: 404 });
        }

        const response: BookDTO = parseWithIdBook2DTO(renewBook);
        return Response.json(response);
    } catch (error) {
        console.error('책을 수정하지 못했습니다.', error);
        return Response.json({ error: '책을 수정하지 못했습니다.' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: '올바르지 않은 책 ID입니다.' }, { status: 400 });
    }

    try {
        const deleted = await deleteBook(id);
        if (!deleted) {
            return Response.json({ error: '책을 찾을 수 없습니다.' }, { status: 404 });
        }

        return Response.json({ success: true });
    } catch (error) {
        console.error('책을 삭제하지 못했습니다.', error);
        return Response.json({ error: '책을 삭제하지 못했습니다.' }, { status: 500 });
    }
}
