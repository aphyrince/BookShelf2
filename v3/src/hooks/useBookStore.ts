'use client';

import requestJSON from '../db/requestJSON';
import getErrorMessage from '../utils/getErrorMessage';
import { create } from 'zustand';

interface BookState {
    books: BookDTO[] | null;
    loading: boolean;
    error: string | null;
}

export const useBookStore = create<BookState>()(() => ({
    books: null,
    loading: false,
    error: null,
}));

export async function refreshBook() {
    useBookStore.setState({ loading: true, error: null });
    try {
        const data = await requestJSON<BookDTO[]>('/api/books');
        useBookStore.setState({ books: data });
    } catch (error) {
        useBookStore.setState({ error: getErrorMessage(error) });
    } finally {
        useBookStore.setState({ loading: false });
    }
}

export async function addBook(input: Book) {
    useBookStore.setState({ error: null });
    try {
        const book = await requestJSON<BookDTO>('/api/books', {
            method: 'POST',
            body: JSON.stringify(input),
        });

        const prevBooks = useBookStore.getState().books || [];
        useBookStore.setState({ books: [...prevBooks, book] });
        return book;
    } catch (error) {
        useBookStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}

export async function getBook(id: string) {
    useBookStore.setState({ error: null });
    try {
        return await requestJSON<BookDTO>(`/api/books/${encodeURIComponent(id)}`);
    } catch (error) {
        useBookStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}

export async function updateBook(id: string, input: Book) {
    useBookStore.setState({ error: null });
    try {
        const book = await requestJSON<BookDTO>(`/api/books/${encodeURIComponent(id)}`, {
            method: 'PUT',
            body: JSON.stringify(input),
        });

        const prevBooks = useBookStore.getState().books || [];
        useBookStore.setState({ books: prevBooks.map((item) => (item.id === id ? book : item)) });
        return book;
    } catch (error) {
        useBookStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}

export async function deleteBook(id: string) {
    useBookStore.setState({ error: null });
    try {
        await requestJSON<{ success: true }>(`/api/books/${encodeURIComponent(id)}`, {
            method: 'DELETE',
        });
        const prevBooks = useBookStore.getState().books || [];
        useBookStore.setState({ books: prevBooks.filter((item) => item.id !== id) });
    } catch (error) {
        useBookStore.setState({ error: getErrorMessage(error) });
        throw error;
    }
}
