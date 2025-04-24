import CustomLink from "@/components/ui/custom-link/CustomLink";
// PostBody seems generic enough, let's try reusing it. If not, create LeetCodeBody.
import PostBody from '@/components/features/post/post-body';
import TableOfContents from '@/components/features/TableOfContents';
import { formatDate } from "@/lib/utils"; // Reusable date formatting
import Comment from '@/components/features/Comment'; // Reusable comment section

// --- LeetCode specific types (defined above or imported) ---
export interface LeetCodeItemForLayout {
    leetcodeID: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    date: string;
    tags?: string[];
    body: { raw: string; code: string };
    leetcodeLink?: string;
}

export type RelatedLeetCodeItem = {
    leetcodeID: number;
    title: string;
    url: string;
} | null;
// --- ---

// Helper function for difficulty styling (optional but nice)
const getDifficultyClass = (difficulty: 'Easy' | 'Medium' | 'Hard'): string => {
    switch (difficulty) {
        case 'Easy':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Hard':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
};

export default function LeetCodeLayout({
    leetcode,          // Changed from 'post'
    nextItem,      // Changed from 'nextPost'
    prevItem,      // Changed from 'prevPost'
    children,      // Remains the same (rendered MDX content)
}: {
    leetcode: LeetCodeItemForLayout,
    nextItem: RelatedLeetCodeItem,
    prevItem: RelatedLeetCodeItem,
    children: React.ReactNode,
}): JSX.Element {
    // Destructure LeetCode specific fields
    const { leetcodeID, title, difficulty, date, tags, body: { raw }, leetcodeLink } = leetcode;

    return (
        <article>
            <div className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                {/* --- HEADER SECTION --- */}
                <header className="py-6">
                    <div className="space-y-4 text-center"> {/* Increased space */}
                        {/* LeetCode Title with ID */}
                        <div className="mb-2"> {/* Reduced margin */}
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                                {`LeetCode ${leetcodeID}: ${title}`}
                            </h1>
                        </div>

                        {/* Metadata: Difficulty, Date, Tags, LeetCode Link */}
                        <dl className="space-y-2 text-center"> {/* Reduced space */}
                            {/* Difficulty Badge */}
                            <div>
                                <dt className="sr-only">難度</dt>
                                <dd className={`inline-block rounded-md px-2 py-1 text-sm font-semibold leading-5 transition-colors ${getDifficultyClass(difficulty)}`}>
                                    {difficulty}
                                </dd>
                            </div>

                            {/* Date */}
                            <div>
                                <dt className="sr-only">發佈時間</dt>
                                <dd className="text-base font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400">
                                    <time dateTime={date}>{formatDate(date)}</time>
                                </dd>
                            </div>

                            {/* Tags */}
                            {tags && tags.length > 0 && (
                                <div>
                                    <dt className="sr-only">標籤</dt>
                                    <dd className="flex flex-wrap justify-center gap-2">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition-colors dark:bg-gray-700 dark:text-gray-200"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </dd>
                                </div>
                            )}

                             {/* Optional: Link to LeetCode Problem */}
                             {leetcodeLink && (
                                <div>
                                     <dt className="sr-only">題目連結</dt>
                                     <dd>
                                         <CustomLink
                                            href={leetcodeLink}
                                            className="text-sm font-medium text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                                            aria-label={`Link to LeetCode problem ${leetcodeID}`}
                                         >
                                             在 LeetCode 上查看題目
                                         </CustomLink>
                                     </dd>
                                 </div>
                             )}
                        </dl>
                    </div>
                </header>

                {/* --- MAIN CONTENT & TOC --- */}
                <div className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6" style={{ gridTemplateRows: 'auto 1fr' }}>
                    {/* MDX Content */}
                    <div className="divide-y divide-gray-200 pt-10 pb-8 transition-colors dark:divide-gray-700 lg:col-span-3">
                        {/* Reusing PostBody, assuming it's just a wrapper */}
                        <PostBody>{children}</PostBody>
                    </div>

                    {/* Table of Contents */}
                    <aside>
                        <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
                             {/* Pass the raw MDX source */}
                            <TableOfContents source={raw} />
                        </div>
                    </aside>
                </div>

                {/* --- FOOTER SECTION (Comments & Navigation) --- */}
                <div className="divide-y divide-gray-200 pb-8 transition-colors dark:divide-gray-700">
                    {/* Reusable Comment Section */}
                    <Comment />

                    {/* Previous/Next Navigation */}
                    <footer>
                        <div className="flex flex-col gap-4 pt-4 text-base font-medium sm:flex-row sm:justify-between xl:gap-8 xl:pt-8">
                            {/* Previous Item Link */}
                            {prevItem ? (
                                <div className="basis-6/12">
                                    <h2 className="mb-1 text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400">
                                        上一題 {/* Changed text */}
                                    </h2>
                                    <CustomLink
                                        href={prevItem.url}
                                        className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                                    >
                                        {/* Display LeetCode ID and Title */}
                                        ← LeetCode {prevItem.leetcodeID}: {prevItem.title}
                                    </CustomLink>
                                </div>
                            ) : (
                                <div /> // Keep placeholder for layout
                            )}
                            {/* Next Item Link */}
                            {nextItem && (
                                <div className="basis-6/12">
                                    <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400 sm:text-right">
                                        下一題 {/* Changed text */}
                                    </h2>
                                    <CustomLink
                                        href={nextItem.url}
                                        className="block text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400 sm:text-right"
                                    >
                                         {/* Display LeetCode ID and Title */}
                                        LeetCode {nextItem.leetcodeID}: {nextItem.title} →
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