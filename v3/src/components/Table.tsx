'use client';
import useDB from '../hooks/useDB';
import TableHeader from './TableHeader';
import BookCard from './BookCard';

const Table = () => {
    const { books, loading, error } = useDB();
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
