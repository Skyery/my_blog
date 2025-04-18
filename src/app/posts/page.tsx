import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import Link from 'next/link';
import { format } from 'date-fns';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata = {
    title: '所有文章',
    description: '瀏覽所有已發布的文章',
};

export default function PostsPage() {
    const posts = allPosts
        .filter((post) => !isProduction || !post.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                所有文章
            </h1>

            <div className="space-y-8">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article
                            key={post.slug}
                            className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
                        >
                            <h2 className="text-2xl font-bold mb-2">
                                <Link
                                    href={post.url}
                                    className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {post.title}
                                </Link>
                            </h2>
                            <time
                                dateTime={post.date}
                                className="text-sm text-gray-500 dark:text-gray-400 block mb-2"
                            >
                                {format(new Date(post.date), 'yyyy年MM月dd日')}
                            </time>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {post.description}
                            </p>
                            <Link
                                href={post.url}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                閱讀更多 →
                            </Link>
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
                        </article>
                    ))
                ) : (
                    <p>還沒有文章發布。</p>
                )}
            </div>
        </div>
    );
}
