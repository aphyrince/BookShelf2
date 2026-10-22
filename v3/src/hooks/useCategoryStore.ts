'use client';

import { create } from 'zustand';
import getErrorMessage from '../utils/getErrorMessage';
import requestJSON from '../db/requestJSON';

interface CategoryState {
    categories: CategoryDTO[] | null;
    loading: boolean;
    error: string | null;
}

export const useCategoryStore = create<CategoryState>()(() => ({
    categories: [],
    loading: false,
    error: null,
}));

export function getCategoryById(categoryId: string) {
    return useCategoryStore.getState().categories?.find((item) => item.id === categoryId) || null;
}

export async function refreshCategory() {
    useCategoryStore.setState({ loading: true, error: null });
    try {
        const data = await requestJSON<CategoryDTO[]>('/api/category');
        useCategoryStore.setState({ categories: data });
    } catch (error) {
        useCategoryStore.setState({ error: getErrorMessage(error) });
    } finally {
        useCategoryStore.setState({ loading: false });
    }
}

export async function addCategory(input: Category) {
    useCategoryStore.setState({ error: null });
    try {
        const category = await requestJSON<CategoryDTO>('/api/category', {
            method: 'POST',
            body: JSON.stringify(input),
        });

        const prevCategories = useCategoryStore.getState().categories || [];
        useCategoryStore.setState({ categories: [...prevCategories, category] });
        return category;
    } catch (error) {
        useCategoryStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}

export async function getCategory(id: string) {
    useCategoryStore.setState({ error: null });
    try {
        return await requestJSON<CategoryDTO>(`/api/category/${encodeURIComponent(id)}`);
    } catch (error) {
        useCategoryStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}

export async function updateCategory(id: string, input: Category) {
    useCategoryStore.setState({ error: null });
    try {
        const category = await requestJSON<CategoryDTO>(`/api/category/${encodeURIComponent(id)}`, {
            method: 'PUT',
            body: JSON.stringify(input),
        });

        const prevCategories = useCategoryStore.getState().categories || [];
        useCategoryStore.setState({ categories: prevCategories.map((item) => (item.id === id ? category : item)) });
        return category;
    } catch (error) {
        useCategoryStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}

export async function deleteCategory(id: string) {
    useCategoryStore.setState({ error: null });
    try {
        await requestJSON<{ success: true }>(`/api/category/${encodeURIComponent(id)}`, {
            method: 'DELETE',
        });
        const prevCategories = useCategoryStore.getState().categories || [];
        useCategoryStore.setState({ categories: prevCategories.filter((item) => item.id !== id) });
    } catch (error) {
        useCategoryStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}
