export const DOCUMENT_GROUPS = [
    'posts',
    'leetcodes',
    'pages'
] as const;

export type DocumentGroup = typeof DOCUMENT_GROUPS[number];

export const LEETCODE_DIFFICULTIES = [
    'Easy',
    'Medium',
    'Hard'
] as const;
export type LeetCodeDifficulties = typeof LEETCODE_DIFFICULTIES[number];

export type DocWithRawPath = { _raw: { flattenedPath: string } };
export type LeetCodeDocForTags = {
    tags?: string[] | undefined;
    leetcodeID: number;
    difficulty: LeetCodeDifficulties;
};