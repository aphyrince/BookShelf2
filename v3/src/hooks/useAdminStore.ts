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

export async function attemptLogin(password: string): Promise<boolean> {
    useAdminStore.setState({ loading: true });
    try {
        const result = await requestLogin(password);
        useAdminStore.setState({ login: result });
        return result;
    } finally {
        useAdminStore.setState({ loading: false });
    }
}

async function requestLogin(password: string) {
    return requestJSON<boolean>('/api/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
    });
}
