export default async function requestJSON<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        ...init,
        headers: {
            ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
            ...init?.headers,
        },
    });

    const body = await response.json();
    if (!response.ok) {
        const message =
            typeof body === 'object' && body !== null && 'error' in body && typeof body.error === 'string'
                ? body.error
                : `요청에 실패했습니다. (${response.status})`;
        throw new Error(message);
    }

    return body as T;
}
