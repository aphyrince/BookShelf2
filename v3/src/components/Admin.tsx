'use client';

import HeaderButton from '../shared/HeaderButton';
import { attemptLogin, logout, useAdminStore } from '../hooks/useAdminStore';
import { useCallback, useState, type FormEvent } from 'react';
import getErrorMessage from '../utils/getErrorMessage';

const Admin = () => {
    const login = useAdminStore((s) => s.login);
    const loading = useAdminStore((s) => s.loading);
    const [dialogMode, setDialogMode] = useState<'LOGIN' | 'LOGOUT' | null>(null);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleAdminPress = useCallback(() => {
        setLoginError(null);
        setDialogMode(login ? 'LOGOUT' : 'LOGIN');
    }, [login]);

    const handleCloseDialog = useCallback(() => {
        setDialogMode(null);
        setPassword('');
        setLoginError(null);
    }, []);

    const handleLoginSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setLoginError(null);

            try {
                const success = await attemptLogin(password);
                if (success) {
                    setPassword('');
                    setDialogMode(null);
                } else {
                    setLoginError('비밀번호가 올바르지 않습니다.');
                }
            } catch (error) {
                setLoginError(getErrorMessage(error));
            }
        },
        [password],
    );

    const handleLogout = useCallback(async () => {
        setLoginError(null);
        try {
            await logout();
            setDialogMode(null);
        } catch (error) {
            setLoginError(getErrorMessage(error));
        }
    }, []);

    return (
        <>
            <div className={`${login && 'admin'} flex justify-center items-center gap-4`}>
                <HeaderButton
                    text={'Admin'}
                    onClick={handleAdminPress}
                    customStyle='admin:bg-red-500 admin:text-white admin:border-transparent'
                />
            </div>

            {dialogMode && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
                    onClick={handleCloseDialog}
                >
                    <section
                        aria-labelledby='admin-dialog-title'
                        aria-modal='true'
                        className='w-full max-w-sm rounded-xl bg-white border border-transparent p-6 text-slate-900 shadow-xl dark:bg-slate-900 dark:text-white dark:border-white'
                        onClick={(event) => event.stopPropagation()}
                        role='dialog'
                    >
                        {dialogMode === 'LOGIN' ? (
                            <form className='flex flex-col gap-4' onSubmit={handleLoginSubmit}>
                                <h2 className='text-lg font-bold' id='admin-dialog-title'>
                                    관리자 로그인
                                </h2>
                                <label className='flex flex-col gap-2 text-sm'>
                                    비밀번호
                                    <input
                                        autoComplete='current-password'
                                        className='rounded-md border border-slate-400 bg-transparent px-3 py-2'
                                        onChange={(event) => setPassword(event.target.value)}
                                        type='password'
                                        value={password}
                                    />
                                </label>
                                {loginError && (
                                    <p className='text-sm text-red-600' role='alert'>
                                        {loginError}
                                    </p>
                                )}
                                <div className='flex justify-end gap-2'>
                                    <HeaderButton
                                        text='cancel'
                                        onClick={handleCloseDialog}
                                        customStyle='not-md:text-sm not-md:px-4 not-md:py-2'
                                    />
                                    <HeaderButton
                                        text={loading ? 'login...' : 'login'}
                                        onClick={() => {}}
                                        type='submit'
                                        disabled={loading || !password}
                                        customStyle='not-md:text-sm not-md:px-4 not-md:py-2 disabled:opacity-50'
                                    />
                                </div>
                            </form>
                        ) : (
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-lg font-bold' id='admin-dialog-title'>
                                    로그아웃 하시겠습니까?
                                </h2>
                                {loginError && (
                                    <p className='text-sm text-red-600' role='alert'>
                                        {loginError}
                                    </p>
                                )}
                                <div className='flex justify-end gap-2'>
                                    <HeaderButton
                                        text='cancel'
                                        onClick={handleCloseDialog}
                                        customStyle='not-md:text-sm not-md:px-4 not-md:py-2'
                                    />
                                    <HeaderButton
                                        text='logout'
                                        onClick={handleLogout}
                                        disabled={loading}
                                        customStyle='not-md:text-sm not-md:px-4 not-md:py-2 md:bg-red-600 not-md:bg-red-600 text-white tracking-wide border-0
                                         hover:bg-white md:hover:text-red-600 md:outline-2 md:outline-transparent md:hover:outline-red-600
                                         hover:dark:bg-white hover:dark:text-red-600 
                                         '
                                    />
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </>
    );
};

export default Admin;
