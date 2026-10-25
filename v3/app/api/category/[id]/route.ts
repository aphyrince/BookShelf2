import { deleteCategory, getCategoryById, parseWithIdCategory2DTO, updateCategory } from '@/src/db/dbCategoryAPIs';
import { requireAdmin } from '@/src/auth/adminSession';
import { ObjectId } from 'mongodb';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: '올바르지 않은 카테고리 ID 입니다.' }, { status: 400 });
    }

    try {
        const category = await getCategoryById(id);
        if (!category) {
            return Response.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
        }

        const response: CategoryDTO = parseWithIdCategory2DTO(category);
        return Response.json(response);
    } catch (error) {
        console.error('카테고리를 불러오지 못했습니다.', error);
        return Response.json({ error: '카테고리를 불러오지 못했습니다.' }, { status: 400 });
    }
}

export async function PUT(request: Request, { params }: RouteContext) {
    const unauthorized = requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: '올바르지 않은 카테고리 ID 입니다.' }, { status: 400 });
    }

    let category: Category;

    try {
        category = (await request.json()) as Category;
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
        }
        throw error;
    }

    try {
        const found = await updateCategory(id, category);
        if (!found) {
            return Response.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
        }

        const renewCategory = await getCategoryById(id);
        if (!renewCategory) {
            return Response.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
        }

        const response: CategoryDTO = parseWithIdCategory2DTO(renewCategory);
        return Response.json(response);
    } catch (error) {
        console.error('카테고리를 수정하지 못했습니다.', error);
        return Response.json({ error: '카테고리를 수정하지 못했습니다.' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteContext) {
    const unauthorized = requireAdmin(request);
    if (unauthorized) return unauthorized;

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
        return Response.json({ error: '올바르지 않은 카테고리 ID 입니다.' }, { status: 400 });
    }

    try {
        const deleted = await deleteCategory(id);
        if (!deleted) {
            return Response.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
        }

        return Response.json({ success: true });
    } catch (error) {
        console.error('카테고리를 삭제하지 못했습니다.', error);
        return Response.json({ error: '카테고리를 삭제하지 못했습니다.' }, { status: 500 });
    }
}
