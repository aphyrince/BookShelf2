import { deleteBook, getBookById, parseBookDTO2Book, parseWithIdBook2DTO, updateBook } from '@/src/db/dbApis';
import { requireAdmin } from '@/src/auth/adminSession';
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
    const unauthorized = requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: '올바르지 않은 책 ID입니다.' }, { status: 400 });
    }

    let bookDTO: BookDTO;
    try {
        bookDTO = (await request.json()) as BookDTO;
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
        }
        throw error;
    }

    const book = parseBookDTO2Book(bookDTO);

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

export async function DELETE(request: Request, { params }: RouteContext) {
    const unauthorized = requireAdmin(request);
    if (unauthorized) return unauthorized;

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
