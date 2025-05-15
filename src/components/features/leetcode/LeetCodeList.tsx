import CustomLink from "@/components/ui/custom-link/CustomLink";
import { formatDate } from "@/lib/utils";
import type { LeetCodeItemForList } from "@/types/leetcode.model";

// const getDifficultyClass = (difficulty: 'Easy' | 'Medium' | 'Hard'): string => {
//     switch (difficulty) {
//         case 'Easy':
//             return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
//         case 'Medium':
//             return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
//         case 'Hard':
//             return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
//         default:
//             return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
// };

type Props = {
    leetcodes: LeetCodeItemForList[];
}

export default function LeetCodeList({ leetcodes = [] }: Props): JSX.Element {
    return (
        <ul className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
            {!leetcodes.length && 'No LeetCode solutions found.'}
            {leetcodes.map((leetcode) => {
                const { slug, date, title, description, url } = leetcode;

                return (
                    <li key={slug} className="group transition-colors">
                        <CustomLink href={url}>
                            <article className="space-y-2 rounded-xl p-4 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-gray-800 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                <dl className="flex flex-col gap-1 sm:flex-row sm:gap-3 xl:flex-col xl:gap-1">
                                    <div className="flex items-center">
                                        <dt className="sr-only">Published on</dt>
                                        <dd className="text-sm font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400 md:text-base">
                                            <time dateTime={date}>{formatDate(date)}</time>
                                        </dd>
                                    </div>
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