import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeCodeTitles from 'rehype-code-titles';
import imageMetadata from './src/plugins/imageMetadata';

// 輔助函數：從文件路徑計算 slug
const computePostSlug = (doc: any) => {
    // 移除 'posts/' 前綴和 '.mdx' 後綴
    return doc._raw.flattenedPath
        .replace(/^posts\/?/, '')
        .replace(/\.mdx$/i, '');
};

const computeLeetCodeSlug = (doc: any) => {
    return doc._raw.flattenedPath
        .replace(/^leetcodes\/?/, '')
        .replace(/\.mdx$/i, '');
}

// 輔助函數：從文件路徑計算頁面 slug
const computePageSlug = (doc: any) => {
    return doc._raw.flattenedPath
        .replace(/^pages\/?/, '')
        .replace(/\.mdx$/i, '');
}

// 輔助函數：從文件自動帶入標籤 tags
const computeLeetCodeTag = (doc: any) => {
    const autoTags = ['LeetCode', doc.leetcodeID, doc.difficulty];
    const userTags = doc.tags || [];
    return Array.from(new Set([...autoTags, ...userTags]));
}

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
            resolve: (doc) => computePostSlug(doc),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/posts/${computePostSlug(doc)}`,
        }
    },
}));

export const LeetCode = defineDocumentType(() => ({
    name: 'LeetCode',
    filePathPattern: `leetcodes/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        leetcodeID: { type: 'number', required: true },
        difficulty: { type: 'enum', options: ['Easy', 'Medium', 'Hard'], required: true },
        draft: { type: 'boolean', default: false },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => computeLeetCodeSlug(doc),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/leetcodes/${computeLeetCodeSlug(doc)}`,
        },
        tags: {
            type: 'list',
            resolve: (doc) => computeLeetCodeTag(doc),
        }
    }
}));

export const Page = defineDocumentType(() => ({
    name: 'Page',
    filePathPattern: `pages/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true }
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => computePageSlug(doc),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/${computePageSlug(doc)}`,
        }
    }
}));

// rehype-pretty-code 的選項
const prettyCodeOptions = {
    // Shiki Theme: https://shiki.style/themes#themes
    theme: 'one-dark-pro',
    onVisitLine(node: any) {
        if (!node.properties) node.properties = {};

        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
        }
        
        let rawText = '';

        for (const child of node.children) {
            if (child.type === 'element' && child.children?.[0]?.type === 'text') {
                rawText += child.children[0].value;
            }
        }

        if (rawText.trim().startsWith('-')) {
            node.properties['data-diff-remove'] = '';
        }
        if (rawText.trim().startsWith('+')) {
            node.properties['data-diff-add'] = '';
        }
    }
};

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post, LeetCode, Page],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            imageMetadata,
            [rehypePrettyCode as any, prettyCodeOptions],
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'wrap',
                    properties: {
                        className: ['anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    }
});
