import { login } from '@/src/db/dbApis';

export async function POST(request: Request) {
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
    } catch (error) {
        console.error('로그인에 실패했습니다.');
        return Response.json({ error: '로그인에 실패했습니다.' }, { status: 400 });
    }
}
