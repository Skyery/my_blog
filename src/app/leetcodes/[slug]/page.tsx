import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { allLeetCodes, LeetCode } from 'contentlayer/generated';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LeetCodeLayout from '@/components/features/leetcode/LeetCodeLayout';

const isProduction = process.env.NODE_ENV === 'production';

// --- 生成靜態路由參數 ---
export async function generateStaticParams(): Promise<{ slug: string }[]> {
    return allLeetCodes
        .filter((leetcode) => !isProduction || !leetcode.draft)
        .map((leetcode) => ({
            slug: leetcode.slug,
        }));
}

// --- 輔助函數：根據 slug 獲取單篇文章數據 ---
async function getLeetCodeFromParams(slug: string): Promise<LeetCode | null> {
    const leetcode = allLeetCodes.find((lc) => lc.slug === slug);

    if (!leetcode || (isProduction && leetcode.draft)) {
        return null;
    }
    return leetcode;
}

// --- 生成頁面 Metadata ---
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const leetcode = await getLeetCodeFromParams(params.slug);
    const siteUrl = 'https://localhost:3000';

    if (!leetcode) {
        return { title: 'LeetCode 題目不存在' };
    }

    return {
        title: leetcode.title,
        description: leetcode.description,
        openGraph: {
            title: leetcode.title,
            description: leetcode.description,
            url: `${siteUrl}${leetcode.url}`,
            type: 'article',
            publishedTime: leetcode.date,
            tags: leetcode.tags,
        },
        other: {
            'leetcode:id': leetcode.leetcodeID.toString(),
            'leetcode:difficulty': leetcode.difficulty,
        }
    };
}

export default async function LeetCodeDetailPage({
    params,
}: {
    params: { slug: string };
}): Promise<JSX.Element> {
    const leetcode = await getLeetCodeFromParams(params.slug);

    if (!leetcode) {
        notFound();
    }

    const sortedItems = allLeetCodes
        .filter((lc) => !isProduction || !lc.draft)
        .sort((a, b) => a.leetcodeID - b.leetcodeID);

    const currentIndex = sortedItems.findIndex((lc) => lc.slug === params.slug);
    const prevItemData = currentIndex > 0 ? sortedItems[currentIndex - 1] : null;
    const nextItemData = currentIndex < sortedItems.length - 1 ? sortedItems[currentIndex + 1] : null;

    const prevItem: { title: string; url: string; leetcodeID: number } | null = prevItemData
        ? { title: prevItemData.title, url: prevItemData.url, leetcodeID: prevItemData.leetcodeID }
        : null;
    const nextItem: { title: string; url: string; leetcodeID: number } | null = nextItemData
        ? { title: nextItemData.title, url: nextItemData.url, leetcodeID: nextItemData.leetcodeID }
        : null;

    return (
        <LeetCodeLayout leetcode={leetcode} prevItem={prevItem} nextItem={nextItem}>
            <MdxRenderer code={leetcode.body.code} />
        </LeetCodeLayout>
    );
}