import { login } from '@/src/db/dbApis';

export async function POST(request: Request) {
    const requestUrl = new URL(request.url);
    const forwardedProtocol =
        process.env.NODE_ENV === 'production'
            ? request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
            : undefined;
    const protocol = forwardedProtocol ?? requestUrl.protocol.replace(':', '');
    const isLocalDevelopment =
        process.env.NODE_ENV !== 'production' &&
        ['localhost', '127.0.0.1', '[::1]'].includes(requestUrl.hostname);

    if (protocol !== 'https' && !isLocalDevelopment) {
        return Response.json({ error: '비밀번호 보호를 위해 HTTPS 연결이 필요합니다.' }, { status: 403 });
    }

    let password: string;
    try {
        const payload = (await request.json()) as Password;
        password = payload.password;
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
        }
        throw error;
    }

    try {
        const result = await login(password);

        if (!result) {
            throw new Error('올바른 비밀번호가 아닙니다!');
        }

        return Response.json(result, { status: 201 });
    } catch {
        console.error('로그인에 실패했습니다.');
        return Response.json({ error: '로그인에 실패했습니다.' }, { status: 400 });
    }
}
