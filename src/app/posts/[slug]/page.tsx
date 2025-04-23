import { allPosts, Post } from 'contentlayer/generated';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { compareDesc } from 'date-fns';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PostLayout from '@/components/features/post/PostLayout';

const isProduction = process.env.NODE_ENV === 'production';

// --- 生成靜態路由參數 ---
export async function generateStaticParams(): Promise<{ slug: string }[]> {
    return allPosts
        .filter((post) => !isProduction || !post.draft)
        .map((post) => ({
            slug: post.slug,
        }));
}

// --- 輔助函數：根據 slug 獲取單篇文章數據 ---
async function getPostFromParams(slug: string): Promise<Post | null> {
    const post = allPosts.find((p) => p.slug === slug);

    if (!post || (isProduction && post.draft)) {
        return null;
    }
    return post;
}

// --- 生成頁面 Metadata ---
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getPostFromParams(params.slug);
    const siteUrl = 'https://localhost:3000';

    if (!post) {
        return { title: '文章不存在' };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            url: `${siteUrl}${post.url}`,
            type: 'article',
            publishedTime: post.date,
            tags: post.tags,
        },
    };
}

export default async function PostDetailPage({
    params,
}: {
    params: { slug: string };
}): Promise<JSX.Element> {
    const post = await getPostFromParams(params.slug);

    if (!post) {
        notFound();
    }

    const sortedPosts = allPosts
        .filter((post) => !isProduction || !post.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    const currentIndex = sortedPosts.findIndex((post) => post.slug === params.slug);
    const prevPostData = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
    const nextPostData = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    const prevPost: { title: string; url: string } | null = prevPostData
        ? { title: prevPostData.title, url: prevPostData.url }
        : null;
    const nextPost: { title: string; url: string } | null = nextPostData
        ? { title: nextPostData.title, url: nextPostData.url }
        : null;

    return (
        <PostLayout post={post} prevPost={prevPost} nextPost={nextPost}>
            <MdxRenderer code={post.body.code} />
        </PostLayout>
    );
}
