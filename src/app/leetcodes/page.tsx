import { allLeetCodes } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import LeetCodeList from '@/components/features/leetcode/LeetCodeList';

const isProduction = process.env.NODE_ENV === 'production';

export const metadata = {
    title: 'LeetCode',
    description: '瀏覽所有已發布的文章',
};

export default function LeetCodePage(): JSX.Element {
    const leetcodes = allLeetCodes
        .filter((leetcode) => !isProduction || !leetcode.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    return (
        <>
            <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
                <div className="prose prose-lg my-8 dark:prose-invert">
                    <h2>所有 LeetCode 練習</h2>
                </div>

                <LeetCodeList leetcodes={leetcodes}/>
            </div>
        </>
    );
}
