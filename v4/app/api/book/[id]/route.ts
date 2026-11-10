import { getBookById } from '@/src/server/services/book.crud';
import { NextRequest, NextResponse } from 'next/server';

type RouteIDContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: RouteIDContext) {
    const { id } = await params;

    try {
        const book = await getBookById(id);

        if (!book) {
            return NextResponse.json({ error: '책을 찾을 수 없습니다.' }, { status: 404 });
        }

        return NextResponse.json(book);
    } catch (error) {
        console.error('책을 불러오지 못했습니다.', error);
        return Response.json({ error: '책을 불러오지 못했습니다.' }, { status: 500 });
    }
}
