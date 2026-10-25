import { createHash, timingSafeEqual } from 'node:crypto';
import { createAdminSessionCookie } from '@/src/auth/adminSession';

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
        const payload = (await request.json()) as { password?: unknown };
        if (typeof payload.password !== 'string' || payload.password.length === 0) {
            return Response.json({ error: '비밀번호를 입력해 주세요.' }, { status: 400 });
        }
        password = payload.password;
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
        }
        throw error;
    }

    try {
        const configuredPassword = process.env.ADMIN_PASSWORD;
        if (!configuredPassword) {
            console.error('ADMIN_PASSWORD 환경 변수가 설정되지 않았습니다.');
            return Response.json({ error: '로그인 설정이 완료되지 않았습니다.' }, { status: 500 });
        }

        const submittedHash = createHash('sha256').update(password, 'utf8').digest();
        const configuredHash = createHash('sha256').update(configuredPassword, 'utf8').digest();
        const authenticated = timingSafeEqual(submittedHash, configuredHash);
        if (!authenticated) {
            return Response.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
        }

        return Response.json(true, {
            status: 200,
            headers: { 'Set-Cookie': createAdminSessionCookie(request) },
        });
    } catch (error) {
        console.error('로그인에 실패했습니다.', error);
        return Response.json({ error: '로그인에 실패했습니다.' }, { status: 500 });
    }
}
