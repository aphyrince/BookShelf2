import connectDB from '@/src/server/db/config';
import { requireAdmin } from '@/src/server/services/admin';
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from '@/src/server/services/category.crud';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();

        const categories = await getCategories();

        return Response.json(categories);
    } catch (error) {
        console.error('카테고리 목록을 불러오지 못했습니다.', error);
        return Response.json({ error: '카테고리 목록을 불러오지 못했습니다.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const unauthorized = requireAdmin(request);
        if (unauthorized) return unauthorized;

        await connectDB();

        const body = (await request.json()) as ICategory;

        const result = createCategory(body);

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: 'Failed to create category' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    try {
        await connectDB();

        const body = (await req.json()) as CategoryDTO;

        const result = updateCategory(body);

        return NextResponse.json(result);
    } catch (error) {
        console.error('카테고리를 수정하지 못했습니다.', error);
        return Response.json({ error: '카테고리를 수정하지 못했습니다.' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const unauthorized = requireAdmin(req);
    if (unauthorized) return unauthorized;

    try {
        await connectDB();

        const body = (await req.json()) as CategoryDTO;

        const result = deleteCategory(body);

        return NextResponse.json(result);
    } catch (error) {
        console.error('카테고리를 삭제하지 못했습니다.', error);
        return Response.json({ error: '카테고리를 삭제하지 못했습니다.' }, { status: 500 });
    }
}
