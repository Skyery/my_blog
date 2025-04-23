export interface LeetCodeItemForList {
    slug: string;
    url: string;
    title: string;
    description: string;
    leetcodeID: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    date: string;
}