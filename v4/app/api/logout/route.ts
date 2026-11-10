import { clearAdminSessionCookie } from '@/src/server/services/admin';

export async function POST(request: Request) {
    return Response.json(
        { success: true },
        { headers: { 'Set-Cookie': clearAdminSessionCookie(request) } },
    );
}
