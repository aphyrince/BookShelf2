import { clearAdminSessionCookie } from '@/src/auth/adminSession';

export async function POST(request: Request) {
    return Response.json(
        { success: true },
        { headers: { 'Set-Cookie': clearAdminSessionCookie(request) } },
    );
}
