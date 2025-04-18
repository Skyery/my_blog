import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeCodeTitles from 'rehype-code-titles';

// 輔助函數：從文件路徑計算 slug
const computeSlug = (doc: any) => {
    // 移除 'posts/' 前綴和 '.mdx' 後綴
    return doc._raw.flattenedPath
        .replace(/^posts\/?/, '')
        .replace(/\.mdx$/i, '');
};

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `posts/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        draft: { type: 'boolean', default: false },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => computeSlug(doc),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/posts/${computeSlug(doc)}`,
        },
    },
}));

// rehype-pretty-code 的選項
const prettyCodeOptions = {
    // Shiki Theme: https://shiki.style/themes#themes
    theme: 'one-dark-pro',
    onVisitLine(node: any) {
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
        }
    },
    onVisitHighlightedLine(node: any) {
        node.properties.className.push('line--highlighted');
    },
    onVisitHighlightedWord(node: any) {
        node.properties.className = ['word--highlighted'];
    },
};

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            [rehypePrettyCode as any, prettyCodeOptions],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    }
});
