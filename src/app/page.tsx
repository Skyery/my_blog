import { compareDesc } from "date-fns";
import { allPosts, type Post } from "contentlayer/generated";
import PostList, { PostForPostList } from '@/app/components/PostList';

type PostForIndexPage = PostForPostList;

export default function Home() {
    const allPostsNewToOld = allPosts?.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    const posts = allPostsNewToOld.map((post) => ({
        slug: post.slug,
        date: post.date,
        title: post.title,
        description: post.description,
        path: post.path,
    })) as PostForIndexPage[];

    return (
        <>
            <div className="prose my-12 space-y-2 transition-colors dark:prose-invert md:prose-lg md:space-y-5">
                <h1 className="text-center sm:text-left">你好，我是Jason Lin！</h1>
                <p>我是一個半路出家，喜歡自學的全端工程師。</p>
                <p>這裡是我用來記錄自學網站技術點滴、感想的筆記本。</p>
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
