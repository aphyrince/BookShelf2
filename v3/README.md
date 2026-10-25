This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 환경 변수

프로젝트 루트(`v3/`)에 `.env.local` 파일을 만들고 아래 값을 설정하세요. 이 환경 변수들은 서버에서만 사용하므로 `NEXT_PUBLIC_` 접두사를 붙이지 마세요.

| 변수 | 필수 | 설명 |
| --- | --- | --- |
| `MONGODB_URI` | 예 | MongoDB 연결 URI |
| `DB_NAME` | 예 | 사용할 MongoDB 데이터베이스 이름 |
| `COLLECTION_NAME` | 예 | 책 데이터를 저장할 컬렉션 이름 |
| `COLLECTION_CATEGORY` | 예 | 카테고리 데이터를 저장할 컬렉션 이름 |
| `ADMIN_PASSWORD` | 예 | 관리자 로그인 비밀번호 |
| `ADMIN_SESSION_SECRET` | 예 | 관리자 세션 서명용 비밀값. UTF-8 기준 32바이트 이상이어야 합니다. |

`.env.local` 예시:

```dotenv
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/
DB_NAME=bookshelf
COLLECTION_NAME=books
COLLECTION_CATEGORY=categories
ADMIN_PASSWORD=<strong-admin-password>
ADMIN_SESSION_SECRET=<random-secret-at-least-32-bytes>
```

세션 비밀값은 다음 명령으로 생성할 수 있습니다.

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

`.env.local`은 로컬 개발용입니다. 배포 환경에서는 배포 플랫폼의 환경 변수 설정에 같은 값을 등록하세요. 비밀번호와 비밀값은 저장소에 커밋하거나 다른 사람과 공유하지 마세요.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Login transport security

The login password is sent to the same-origin `/api/login` endpoint over HTTPS. Vercel provides HTTPS for deployed domains; the app rejects login attempts made over HTTP and sends an HSTS header so browsers continue to use HTTPS. No separate client-side password encryption is used because HTTPS encrypts and authenticates the entire connection.

For local development, login is allowed on `http://localhost` only. A device connecting to the development server through a LAN IP must use the deployed HTTPS URL to log in.

## Admin API sessions

Set `ADMIN_PASSWORD` to the administrator password and `ADMIN_SESSION_SECRET` to a unique random secret of at least 32 bytes in the Vercel project environment (and in `.env.local` for local development). Keep both values server-side: do not prefix them with `NEXT_PUBLIC_` or commit them to the repository. Generate a session secret with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Successful login checks `ADMIN_PASSWORD` and sets a seven-day, `HttpOnly`, `SameSite=Lax` session cookie; book and category create, update, and delete APIs reject requests without a valid signature. Logging out expires the cookie.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
