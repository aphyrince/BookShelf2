import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = 'bookshelf_admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSessionSecret(): string {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret || Buffer.byteLength(secret) < 32) {
        throw new Error('ADMIN_SESSION_SECRET must be configured with at least 32 bytes.');
    }
    return secret;
}

function sign(expiration: string): Buffer {
    return createHmac('sha256', getSessionSecret()).update(`admin-session:${expiration}`).digest();
}

function isSecureRequest(request: Request): boolean {
    const forwardedProtocol = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    return (
        process.env.NODE_ENV === 'production' ||
        forwardedProtocol === 'https' ||
        new URL(request.url).protocol === 'https:'
    );
}

function cookieAttributes(request: Request): string {
    return `Path=/; HttpOnly; SameSite=Lax${isSecureRequest(request) ? '; Secure' : ''}`;
}

export function createAdminSessionCookie(request: Request): string {
    const expiration = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE);
    const token = `${expiration}.${sign(expiration).toString('base64url')}`;
    return `${SESSION_COOKIE}=${token}; ${cookieAttributes(request)}; Max-Age=${SESSION_MAX_AGE}`;
}

export function clearAdminSessionCookie(request: Request): string {
    return `${SESSION_COOKIE}=; ${cookieAttributes(request)}; Max-Age=0`;
}

export function requireAdmin(request: Request): Response | null {
    const sessionCookie = request.headers
        .get('cookie')
        ?.split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`));
    const token = sessionCookie?.slice(SESSION_COOKIE.length + 1);
    const [expiration, providedSignature, ...extraParts] = token?.split('.') ?? [];

    if (!expiration || !providedSignature || extraParts.length > 0 || !/^\d+$/.test(expiration)) {
        return Response.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    if (Number(expiration) <= Math.floor(Date.now() / 1000)) {
        return Response.json({ error: '로그인 세션이 만료되었습니다.' }, { status: 401 });
    }

    const expectedSignature = sign(expiration);
    const signature = Buffer.from(providedSignature, 'base64url');
    if (signature.length !== expectedSignature.length || !timingSafeEqual(signature, expectedSignature)) {
        return Response.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    return null;
}
