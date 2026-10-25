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

export async function logout() {
    useAdminStore.setState({ loading: true });
    try {
        await requestJSON<{ success: true }>('/api/logout', { method: 'POST' });
        useAdminStore.setState({ login: false });
    } finally {
        useAdminStore.setState({ loading: false });
    }
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
    const isLocalDevelopment =
        process.env.NODE_ENV !== 'production' &&
        ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
    if (window.location.protocol !== 'https:' && !isLocalDevelopment) {
        throw new Error('비밀번호 보호를 위해 HTTPS 연결에서만 로그인할 수 있습니다.');
    }

    return requestJSON<boolean>('/api/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
    });
}
