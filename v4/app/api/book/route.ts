import connectDB from '@/src/server/db/config';
import { requireAdmin } from '@/src/server/services/admin';
import { createBook, deleteBook, getBooks, updateBook } from '@/src/server/services/book.crud';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        const books = await getBooks();

        return Response.json(books);
    } catch (error) {
        console.error('책 목록을 불러오지 못했습니다.', error);
        return Response.json({ error: '책 목록을 불러오지 못했습니다.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const unauthorized = requireAdmin(request);
        if (unauthorized) return unauthorized;

        await connectDB();

        const body = (await request.json()) as IBook;

        const result = createBook(body);

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: 'Failed to create book' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    try {
        await connectDB();

        const body = (await req.json()) as BookDTO;

        const result = updateBook(body);

        return NextResponse.json(result);
    } catch (error) {
        console.error('책을 수정하지 못했습니다.', error);
        return Response.json({ error: '책을 수정하지 못했습니다.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    try {
        await connectDB();

        const body = (await req.json()) as BookDTO;

        const result = deleteBook(body);

        return NextResponse.json(result);
    } catch (error) {
        console.error('책을 삭제하지 못했습니다.', error);
        return Response.json({ error: '책을 삭제하지 못했습니다.' }, { status: 500 });
    }
}
