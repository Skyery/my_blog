import { allPosts, type Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { compareDesc, format, parseISO } from "date-fns";
import PostLayout, {
    PostForPostLayout,
    RelatedPostForPostLayout,
} from '@/app/components/PostLayout';
import mdxComponents from '@/app/lib/mdxComponents';

export interface PostForPostPage {
    title: string;
    date: string;
    description: string;
    body: {
        code: string;
        raw: string;
    };
}

export default function LayOutPage({ params }: { params: { slug: string } }) {
    const allPostsNewToOld = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    const postIndex = allPostsNewToOld.findIndex((post) => post.slug === params?.slug);
    if (postIndex === -1) {
        return {
            notFound: true,
        };
    }
    const prevFull = allPostsNewToOld[postIndex + 1] || null;
    const prevPost: RelatedPostForPostLayout = prevFull ? { title: prevFull.title, path: prevFull.path } : null;
    const nextFull = allPostsNewToOld[postIndex - 1] || null;
    const nextPost: RelatedPostForPostLayout = nextFull ? { title: nextFull.title, path: nextFull.path } : null;
    const postFull = allPostsNewToOld[postIndex];
    const post: PostForPostPage = {
        title: postFull.title,
        date: postFull.date,
        description: postFull.description,
        body: {
            code: postFull.body.code,
            raw: postFull.body.raw,
        },
    };
    if (!post) {
        return {
            notFound: true,
        };
    }

    const MDXContent = useMDXComponent(post?.body.code);


    return (
        <>
            <PostLayout post={post} prevPost={prevPost} nextPost={nextPost}>
                <MDXContent components={mdxComponents} />
            </PostLayout>
        </>
    )
}