import { allPosts, Post } from 'contentlayer/generated';
import { MdxRenderer } from './MdxRenderer';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

// --- 生成靜態路由參數 ---
export async function generateStaticParams() {
    return allPosts
        .filter((post) => !isProduction || !post.draft)
        .map((post) => ({
            slug: post.slug,
        }));
}

// --- 輔助函數：根據 slug 獲取單篇文章數據 ---
async function getPostFromParams(slug: string): Promise<Post | null> {
    const post = allPosts.find((p) => p.slug === slug);

    // 如果找不到或在生產環境是草稿，返回 null
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
        return { title: '文章未找到' };
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

// --- 頁面組件 ---
export default async function PostDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const post = await getPostFromParams(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="prose dark:prose-invert max-w-none mx-auto">
            {' '}
            <header className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                    {post.title}
                </h1>
                <time
                    dateTime={post.date}
                    className="text-gray-500 dark:text-gray-400 text-sm"
                >
                    發布於 {format(new Date(post.date), 'yyyy年MM月dd日')}
                </time>
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>
            <MdxRenderer code={post.body.code} />

            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            </footer>
        </article>
    );
}
