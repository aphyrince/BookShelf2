'use client';
import React from 'react';
import useDB from '../hooks/useDB';

const Table = () => {
    const { books, loading, error } = useDB();
    return (
        <div>
            {/* 테이블 헤더 */}
            <div>
                <p>Title & Authors</p>
                <p>Category</p>
                <p>Read-at</p>
                <p>Count</p>
                <p>Rating</p>
                <p>Comment</p>
            </div>
            {/* 카드 리스트 */}
            <div>
                {books &&
                    books.map((item) => (
                        <div key={item.id}>
                            <div>
                                <p>{item.title}</p>
                                <p>{item.author}</p>
                            </div>
                            <p>category...</p>
                            <p>{item.readAt}</p>
                            <p>{item.count}</p>
                            <p>{item.rating}</p>
                            <p>{item.comment}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Table;
