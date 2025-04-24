import { allPosts, allLeetCodes, Post, LeetCode } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import {
    HomeIcon,
    LightBulbIcon,
    MoonIcon,
    SunIcon,
    CodeBracketSquareIcon,
    DocumentTextIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Priority, type Action } from 'kbar';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const isProduction = process.env.NODE_ENV === 'production';

export const generateKBarActions = (
    router: AppRouterInstance,
    setTheme: (theme: string) => void
): Action[] => {

    // --- 文章 Actions ---
    const postActions = allPosts
        .filter((post) => !isProduction || !post.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .map((post: Post) => ({
            id: `post-${post.slug}`,
            name: post.title,
            keywords: `文章 post blog article ${post.title} ${post.description} ${post.tags ? post.tags.join(' ') : ''}`,
            perform: () => router.push(post.url),
            section: '文章',
            priority: Priority.NORMAL,
            icon: <DocumentTextIcon className="h-6 w-6" />,
        }));

    // --- LeetCode Actions ---
    const leetcodeActions = allLeetCodes
        .filter((leetcode) => !isProduction || !leetcode.draft)
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .map((leetcode: LeetCode) => ({
            id: `leetcode-${leetcode.slug}`,
            name: `LeetCode ${leetcode.leetcodeID}: ${leetcode.title}`,
            keywords: `leetcode algorithm problem ${leetcode.leetcodeID} ${leetcode.title} ${leetcode.difficulty} ${leetcode.description} ${leetcode.tags ? leetcode.tags.join(' ') : ''}`,
            perform: () => router.push(leetcode.url),
            section: 'LeetCode',
            priority: Priority.NORMAL,
            icon: <CodeBracketSquareIcon className="h-6 w-6" />,
        }));

    // --- Static Actions ---
    const staticActions: Action[] = [
        {
            id: 'home',
            name: '首頁',
            keywords: 'home homepage index 首頁',
            perform: () => router.push('/'),
            icon: <HomeIcon className="h-6 w-6" />,
            section: '頁面',
            priority: Priority.HIGH
        },
        {
            id: 'leetcode-list',
            name: 'LeetCode 列表',
            keywords: 'leetcode list 列表 題目',
            perform: () => router.push('/leetcodes'),
            section: '頁面',
            icon: <CodeBracketSquareIcon className="h-6 w-6" />,
            priority: Priority.LOW
        },
        {
            id: 'posts-list',
            name: '文章列表',
            keywords: 'posts blog list 文章 部落格 列表',
            perform: () => router.push('/posts'),
            section: '頁面',
            icon: <DocumentTextIcon className="h-6 w-6" />,
            priority: Priority.LOW
        },
        {
            id: 'about-page',
            name: '關於我',
            keywords: 'about me 關於 我',
            perform: () => router.push('/about'),
            section: '頁面',
            icon: <UserIcon className="h-6 w-6" />,
            priority: Priority.LOW
        },
        {
            id: 'theme',
            name: '切換主題',
            keywords: 'change toggle theme mode color 切換 更換 顏色 主題 模式',
            icon: <LightBulbIcon className="h-6 w-6" />,
            section: '操作',
            priority: Priority.NORMAL
        },
        {
            id: 'theme-light',
            name: '明亮模式',
            keywords: 'theme light white mode color 顏色 主題 模式 明亮 白色',
            perform: () => setTheme('light'),
            icon: <SunIcon className="h-6 w-6" />,
            parent: 'theme',
            section: '操作'
        },
        {
            id: 'theme-dark',
            name: '暗黑模式',
            keywords: 'theme dark black mode color 顏色 主題 模式 暗黑 黑色 深夜',
            perform: () => setTheme('dark'),
            icon: <MoonIcon className="h-6 w-6" />,
            parent: 'theme',
            section: '操作'
        }
    ];

    return [...staticActions, ...postActions, ...leetcodeActions];
};