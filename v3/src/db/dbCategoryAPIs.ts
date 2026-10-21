import 'server-only';
import { ObjectId, WithId } from 'mongodb';
import clientPromise from './mongodb';

const DB_NAME = process.env.DB_NAME as string;
const COLLECTION_CATEGORY = process.env.COLLECTION_CATEGORY as string;

export function parseWithIdCategory2DTO(category: WithId<Category>): CategoryDTO {
    return {
        id: category._id.toString(),
        text: category.text,
        bgColor: category.bgColor,
        darkBgColor: category.darkBgColor,
        fontColor: category.fontColor,
        darkFontColor: category.darkFontColor,
    };
}

async function getCategoryCollection() {
    const client = await clientPromise;
    return client.db(DB_NAME).collection<Category>(COLLECTION_CATEGORY);
}

export async function createCategory(category: Category): Promise<string> {
    const result = await (await getCategoryCollection()).insertOne({ ...category });

    return result.insertedId.toString();
}

export async function getCategories(): Promise<WithId<Category>[]> {
    return (await getCategoryCollection()).find().toArray();
}

export async function getCategoryById(id: string): Promise<WithId<Category> | null> {
    if (!ObjectId.isValid(id)) {
        throw new Error('올바르지 않은 카테고리 ID 입니다.');
    }

    return (await getCategoryCollection()).findOne({ _id: new ObjectId(id) });
}

export async function updateCategory(id: string, category: Category): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
        throw new Error('올바르지 않은 카테고리 ID 입니다.');
    }

    const result = await (
        await getCategoryCollection()
    ).updateOne({ _id: new ObjectId(id) }, { $set: { ...category } });

    return result.matchedCount > 0;
}

export async function deleteCategory(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
        throw new Error('올바르지 않은 카테고리 ID 입니다.');
    }

    const result = await (
        await getCategoryCollection()
    ).deleteOne({
        _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
}
