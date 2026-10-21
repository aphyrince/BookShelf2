'use client';

import { useCallback, useEffect, useState } from 'react';
import requestJSON from '../utils/requestJSON';

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
}

export default function useDB() {
    const [books, setBooks] = useState<BookDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await requestJSON<BookDTO[]>('/api/books');
            setBooks(data);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        requestJSON<BookDTO[]>('/api/books')
            .then((data) => {
                if (active) setBooks(data);
            })
            .catch((error: unknown) => {
                if (active) setError(getErrorMessage(error));
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const addBooks = useCallback(async (input: Book) => {
        setError(null);
        try {
            const book = await requestJSON<BookDTO>('/api/books', {
                method: 'POST',
                body: JSON.stringify(input),
            });
            setBooks((prev) => [book, ...prev]);
            return book;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    }, []);

    const getBook = useCallback(async (id: string) => {
        setError(null);
        try {
            return await requestJSON<BookDTO>(`/api/books/${encodeURIComponent(id)}`);
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    }, []);

    const updateBook = useCallback(async (id: string, input: Book) => {
        setError(null);
        try {
            const book = await requestJSON<BookDTO>(`/api/books/${encodeURIComponent(id)}`, {
                method: 'PUT',
                body: JSON.stringify(input),
            });
            setBooks((prev) => prev.map((item) => (item.id === id ? book : item)));
            return book;
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    }, []);

    const deleteBook = useCallback(async (id: string) => {
        setError(null);
        try {
            await requestJSON<{ success: true }>(`/api/books/${encodeURIComponent(id)}`, {
                method: 'DELETE',
            });
            setBooks((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        }
    }, []);

    return { books, loading, error, refresh, addBooks, getBook, updateBook, deleteBook };
}
