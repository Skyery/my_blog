export interface PostForPostList {
    /** 文章標題 */
    title: string;
    /** 文章描述 */
    description: string;
    /** 文章發布日期 */
    date: string;
    /** 文章標籤 */
    tags: string[];
    /** 是否為草稿 (預設為 false) */
    draft: boolean;
    /** 文章的 slug */
    slug: string;
    /** 文章的完整 URL 路徑 */
    url: string;
    /** Contentlayer 生成的唯一 ID */
    _id: string;
    /** 文檔類型名稱 */
    type: 'Post';
    /**
     * MDX 內容主體
     * - code: 編譯後的 MDX 內容，用於 useMDXComponent
     * - raw: 原始的 Markdown/MDX 文本內容
     */
    body: {
        code: string;
        raw: string;
    }
}