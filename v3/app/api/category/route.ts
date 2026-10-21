import { createCategory, getCategories, getCategoryById, parseWithIdCategory2DTO } from '@/src/db/dbCategoryAPIs';

export async function GET() {
    try {
        const categories = await getCategories();
        const response: CategoryDTO[] = categories.map((item) => parseWithIdCategory2DTO(item));

        return Response.json(response);
    } catch (error) {
        console.error('카테고리 목록을 불러오지 못했습니다.', error);
        return Response.json({ error: '카테고리 목록을 불러오지 못했습니다.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    let newCategory: Category;

    try {
        newCategory = (await request.json()) as Category;
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
        }
        throw error;
    }

    try {
        const id = await createCategory(newCategory);
        const category = await getCategoryById(id);
        if (!category) {
            throw new Error('저장한 카테고리를 다시 찾을 수 없습니다.');
        }
        const response: CategoryDTO = parseWithIdCategory2DTO(category);
        return Response.json(response, { status: 201 });
    } catch (error) {
        console.error('카테고리를 저장하지 못했습니다.', error);
        return Response.json({ error: '책을 저장하지 못했습니다.' }, { status: 500 });
    }
}
