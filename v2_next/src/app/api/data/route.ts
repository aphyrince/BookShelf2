import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

// Vercel KV 환경 변수를 사용하여 Redis 초기화
const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
});

const DATA_KEY = "reading_log_storage";

// 데이터 불러오기
export async function GET() {
    try {
        const data = await redis.get(DATA_KEY);

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
        console.error("Redis GET Error:", error);
        return NextResponse.json(
            { error: "데이터 로드 실패" },
            { status: 500 },
        );
    }
}

// 데이터 저장하기
export async function POST(request: Request) {
    try {
        const { password, data } = await request.json();

        // 관리자 암호 확인
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        // 데이터 저장
        await redis.set(DATA_KEY, JSON.stringify(data));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Redis POST Error:", error);
        return NextResponse.json(
            { error: "데이터 저장 실패" },
            { status: 500 },
        );
    }
}
