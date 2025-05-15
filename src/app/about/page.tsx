import { allPages, Page } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import SectionContainer from '@/components/layout/SectionContainer';

async function getPostFromParams(slug: string): Promise<Page | undefined> {
    const page = allPages.find((page) => page.slug === slug);
    return page;
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPostFromParams('about');

    if (!page) {
        return { title: '頁面不存在' };
    }

    return {
        title: page.title
    }
}

export default async function AboutPage(): Promise<JSX.Element> {
    const page = await getPostFromParams('about');

    if (!page) {
        notFound();
    }

    return (
        <SectionContainer>
            <article className='prose dark:prose-invert max-w-none py-8'>
                <h1>{page.title}</h1>
                <MdxRenderer code={page.body.code} />
            </article>
        </SectionContainer>
    );
}
