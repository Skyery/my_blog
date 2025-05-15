import { allPosts } from 'contentlayer/generated';
import { compareDesc } from "date-fns";
import PostList from '@/components/features/post/PostList';

const isProduction = process.env.NODE_ENV === 'production';

export default function Home(): JSX.Element {
    const posts = allPosts
        .filter((post) => !isProduction || !post.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    return (
        <>
            <div className="prose my-12 space-y-2 transition-colors dark:prose-invert md:prose-lg md:space-y-5">
                <h1 className="text-center sm:text-left">你好，我是Jason Lin！</h1>
                <p>我是個熱衷於學習新知、半路出家的Mid-Level全端工程師。</p>
                <p>這裡是我探索新知及工作經驗的筆記本，紀錄點點滴滴的成長歷程。</p>
            </div>

            <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                <div className="prose prose-lg my-8 dark:prose-invert">
                    <h2>最新文章</h2>
                </div>

                <PostList posts={posts} />
            </div>
        </>
    );
}
