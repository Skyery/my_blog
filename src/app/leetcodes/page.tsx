import { allLeetCodes, LeetCode } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostList, { PostForPostList } from '@/app/components/PostList';

type PostForIndexPage = PostForPostList;

export default function LeetCode() {
    const allPostsNewToOld = allLeetCodes?.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    const posts = allPostsNewToOld.map((post) => ({
        slug: post.slug,
        date: post.date,
        title: post.title,
        description: post.description,
        path: post.path,
    })) as PostForIndexPage[];
    

    return (
        <>
            <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                <div className="prose prose-lg my-8 dark:prose-invert">
                    <h2>LeetCode 練習</h2>
                </div>

                <PostList posts={posts} />
            </div>
        </>
    );
}