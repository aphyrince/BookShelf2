import { create } from 'zustand';
import requestJSON from '../db/requestJSON';

interface AdminState {
    login: boolean;
    loading: boolean;
}

export const useAdminStore = create<AdminState>()(() => ({
    login: false,
    loading: false,
}));

export function logout() {
    useAdminStore.setState({ login: false });
}

export function attemptLogin(password: string) {
    useAdminStore.setState({ loading: true });
    requestLogin(password)
        .then((result) => useAdminStore.setState({ login: result }))
        .catch((error) => {
            console.error(error);
        })
        .finally(() => useAdminStore.setState({ loading: false }));
}

async function requestLogin(password: string) {
    try {
        const result = await requestJSON<boolean>('/api/login', {
            method: 'POST',
            body: JSON.stringify({ password }),
        });
        return result;
    } catch (error) {
        throw error;
    }
}
