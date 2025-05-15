import CustomLink from "@/components/ui/custom-link/CustomLink";
import { formatDate } from "@/lib/utils";

import { PostForPostList } from "@/types/post.model";

type Props = {
    posts: PostForPostList[]
}

export default function PostList({ posts = [] }: Props): JSX.Element {
    return (
        <ul className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.map((post) => {
                const { slug, date, title, description, url } = post;
                return (
                    <li key={slug} className="group transition-colors">
                        <CustomLink href={url}>
                            <article className="space-y-2 rounded-xl p-4 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800 xl:grid xl:grid-cols-4  xl:items-baseline xl:space-y-0">
                                <dl>
                                    <dt className="sr-only">Published on</dt>
                                    <dd className="text-sm font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400 md:text-base">
                                        <time dateTime={date}>{formatDate(date)}</time>
                                    </dd>
                                </dl>
                                <div className="space-y-3 xl:col-span-3">
                                    <div>
                                        <h3 className="text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-xl md:text-2xl">
                                            {title}
                                        </h3>
                                    </div>
                                    <div className="prose prose-sm max-w-none text-gray-500 transition-colors dark:text-gray-400 md:prose-base">
                                        {description}
                                    </div>
                                </div>
                            </article>
                        </CustomLink>
                    </li>
                );
            })}
        </ul>
    );
}
