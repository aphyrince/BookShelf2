import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const DATA_KEY = "reading_log_storage";

// 데이터 불러오기 (GET)
export async function GET() {
    try {
        const data = await kv.get(DATA_KEY);
        // 데이터가 없을 경우 초기값 반환
        if (!data) {
            return NextResponse.json({
                books: [],
                categories: [
                    "컴퓨터과학",
                    "신경과학·건강",
                    "자기계발",
                    "인문학",
                ],
            });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("KV GET Error:", error);
        return NextResponse.json(
            { error: "데이터를 불러오지 못했습니다." },
            { status: 500 },
        );
    }
}

// 데이터 저장하기 (POST)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password, data } = body;

        // Vercel 환경변수에 설정한 ADMIN_PASSWORD와 비교
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: "권한이 없습니다." },
                { status: 401 },
            );
        }

        await kv.set(DATA_KEY, data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("KV SET Error:", error);
        return NextResponse.json(
            { error: "데이터 저장에 실패했습니다." },
            { status: 500 },
        );
    }
}
