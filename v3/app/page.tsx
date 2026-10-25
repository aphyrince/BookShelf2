import { cookies } from 'next/headers';
import { Suspense } from 'react';
import PageContent from '@/src/components/PageContent';

const ThemeAwarePageContent = async () => {
    const cookieStore = await cookies();
    const initialDarkTheme = cookieStore.get('theme')?.value === 'dark';

    return <PageContent initialDarkTheme={initialDarkTheme} />;
};

const Page = () => (
    <Suspense
        fallback={
            <main
                className='flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-white'
                role='status'
                aria-live='polite'
            >
                책장을 불러오는 중...
            </main>
        }
    >
        <ThemeAwarePageContent />
    </Suspense>
);

export default Page;
