import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
    title: '안정호의 책장',
    description: '안정호가 읽은 책들',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html className='h-full antialiased'>
            <body className='min-h-full flex flex-col relative'>{children}</body>
        </html>
    );
}
