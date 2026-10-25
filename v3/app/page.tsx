import { cookies } from 'next/headers';
import PageContent from '@/src/components/PageContent';

const Page = async () => {
    const cookieStore = await cookies();
    const initialDarkTheme = cookieStore.get('theme')?.value === 'dark';

    return <PageContent initialDarkTheme={initialDarkTheme} />;
};

export default Page;
