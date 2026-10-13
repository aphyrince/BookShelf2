'use client';
import React from 'react';
import useDB from '../hooks/useDB';

const Table = () => {
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
            <div></div>
        </div>
    );
};

export default Table;
