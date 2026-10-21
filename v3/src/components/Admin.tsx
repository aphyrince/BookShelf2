'use client';

import HeaderButton from '../shared/HeaderButton';
import { attemptLogin, logout, useAdminStore } from '../hooks/useAdminStore';
import { useCallback } from 'react';

const Admin = () => {
    const login = useAdminStore((s) => s.login);
    const loading = useAdminStore((s) => s.loading);

    const handleAdminPress = useCallback(() => {
        if (login) {
            confirm('로그아웃 하시겠습니까?') && logout();
            return;
        }
        const password = prompt('비밀번호 입력');
        console.log(password, login);
        if (password) attemptLogin(password);
    }, [login]);

    return (
        <div className={`${login && 'admin'} flex justify-center items-center gap-4`}>
            {login && <HeaderButton text={'Add Book'} onClick={() => {}} />}
            {login && <HeaderButton text={'Edit Category'} onClick={() => {}} />}
            <HeaderButton
                text={'Admin'}
                onClick={handleAdminPress}
                customStyle='admin:bg-red-500 admin:text-white admin:border-transparent'
            />
        </div>
    );
};

export default Admin;
