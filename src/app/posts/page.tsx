import PostList from '@/components/features/post/PostList';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata = {
    title: '所有文章',
    description: '瀏覽所有已發布的文章',
};

export default function PostsPage(): JSX.Element {
    const posts = allPosts
        .filter((post) => !isProduction || !post.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    return (
        <>
            <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                <div className="prose prose-lg my-8 dark:prose-invert">
                    <h2>所有文章</h2>
                </div>

                <PostList posts={posts} />
            </div>
        </>
    );
}
