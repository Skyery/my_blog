import CustomLink from "@/components/ui/custom-link/CustomLink";
import PostBody from '@/components/features/post/post-body';
import TableOfContents from '@/components/features/TableOfContents';
import { formatDate } from "@/lib/utils";
import Comment from '@/components/features/Comment';

export interface PostForPostLayout {
    date: string;
    title: string;
    body: { raw: string };
}

export type RelatedPostForPostLayout = {
    title: string;
    url: string;
} | null;

export default function PostLayout({
    post,
    nextPost,
    prevPost,
    children,
}: {
    post: PostForPostLayout,
    nextPost: RelatedPostForPostLayout,
    prevPost: RelatedPostForPostLayout,
    children: React.ReactNode,
}): JSX.Element {
    const { date, title, body: { raw } } = post;

    return (
        <article>
            <div className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                <header className="py-6">
                    <div className="space-y-1 text-center">
                        <div className="mb-4">
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                                {title}
                            </h1>
                        </div>

                        <dl className="space-y-10">
                            <div>
                                <dt className="sr-only">發佈時間</dt>
                                <dd className="text-base font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400">
                                    <time dateTime={date}>{formatDate(date)}</time>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </header>

                <div className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6" style={{ gridTemplateRows: 'auto 1fr' }}>
                    <div className="divide-y divide-gray-200 pt-10 pb-8 transition-colors dark:divide-gray-700 lg:col-span-3">
                        <PostBody>{children}</PostBody>
                    </div>

                    <aside>
                        <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
                            <TableOfContents source={raw} />
                        </div>
                    </aside>
                </div>

                <div className="divide-y divide-gray-200 pb-8 transition-colors dark:divide-gray-700">
                    <Comment />
                    <footer>
                        <div className="flex flex-col gap-4 pt-4 text-base font-medium sm:flex-row sm:justify-between xl:gap-8 xl:pt-8">
                            {prevPost ? (
                                <div className="basis-6/12">
                                    <h2 className="mb-1 text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400">
                                        上一篇
                                    </h2>
                                    <CustomLink
                                        href={prevPost.url}
                                        className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                                    >
                                        ← {prevPost.title}
                                    </CustomLink>
                                </div>
                            ) : (
                                <div />
                            )}
                            {nextPost && (
                                <div className="basis-6/12">
                                    <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400 sm:text-right">
                                        下一篇
                                    </h2>
                                    <CustomLink
                                        href={nextPost.url}
                                        className="block text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400 sm:text-right"
                                    >
                                        {nextPost.title} →
                                    </CustomLink>
                                </div>
                            )}
                        </div>
                    </footer>
                </div>
            </div>
        </article>
    );
}