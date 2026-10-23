'use client';

import TableHeader from './TableHeader';
import BookCard from './BookCard';
import { useBookStore } from '../hooks/useBookStore';

const Table = () => {
    const books = useBookStore((s) => s.books);
    return (
        <div className='flex-col outline outline-slate-500 divide-y divide-slate-500'>
            <TableHeader />
            {/* 카드 리스트 */}
            <div className='divide-y divide-slate-500 '>
                {books && books.map((item) => <BookCard key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default Table;
