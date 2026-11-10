import 'server-only';
import { Schema } from 'mongoose';
import Category from '../db/model.Category';

export async function getCategories() {
    return await Category.find().lean();
}

export async function getCategoryById(id: Schema.Types.ObjectId) {
    return await Category.findById(id).lean();
}

export async function createCategory(newCategory: ICategory) {
    const category = new Category(newCategory);

    return await category.save();
}

export async function updateCategory(categoryDTO: CategoryDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...updatedCategoryData } = categoryDTO;

    return await Category.findByIdAndUpdate(categoryDTO._id, updatedCategoryData, {
        new: true,
        runValidators: true,
    });
}

export async function deleteCategory(categoryDTO: CategoryDTO) {
    return await Category.findByIdAndDelete(categoryDTO._id);
}
