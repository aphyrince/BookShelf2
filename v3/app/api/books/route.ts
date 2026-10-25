import { createBook, getBookById, getBooks, parseWithIdBook2DTO } from '@/src/db/dbApis';

export async function GET() {
    try {
        const books = await getBooks();
        const response: BookDTO[] = books.map((book) => parseWithIdBook2DTO(book));

        return Response.json(response);
    } catch (error) {
        console.error('책 목록을 불러오지 못했습니다.', error);
        return Response.json({ error: '책 목록을 불러오지 못했습니다.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    let newBook: Book;
    try {
        const body = (await request.json()) as Omit<Book, 'readAt'> & { readAt?: string };
        const readAt = body.readAt ? new Date(body.readAt) : undefined;
        if (readAt && Number.isNaN(readAt.getTime())) {
            return Response.json({ error: '읽은 날짜가 올바르지 않습니다.' }, { status: 400 });
        }

        newBook = { ...body, readAt };
    } catch (error) {
        if (error instanceof SyntaxError) {
            return Response.json({ error: '요청 본문이 올바른 JSON이 아닙니다.' }, { status: 400 });
        }
        throw error;
    }

    try {
        const id = await createBook(newBook);
        const book = await getBookById(id);
        if (!book) {
            throw new Error('저장한 책을 다시 찾을 수 없습니다.');
        }

        const response: BookDTO = parseWithIdBook2DTO(book);
        return Response.json(response, { status: 201 });
    } catch (error) {
        console.error('책을 저장하지 못했습니다.', error);
        return Response.json({ error: '책을 저장하지 못했습니다.' }, { status: 500 });
    }
}
