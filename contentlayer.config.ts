import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeCodeTitles from 'rehype-code-titles';
import imageMetadata from './src/plugins/imageMetadata';

import {
    DocumentGroup,
    LEETCODE_DIFFICULTIES,
    DocWithRawPath,
    LeetCodeDocForTags
} from './src/types/contentlayer-config.model';

/**
 * 輔助函數：從文件路徑計算 slug
 * @param documentGroup ContentLayer 的類型。 (e.g. posts、leetcodes、pages 等)
 * @param doc 
 * @returns {String} 計算後的 slug
 */
function computeSlug(documentGroup: DocumentGroup, doc: DocWithRawPath): string {
    const pattern: RegExp = new RegExp(`^${documentGroup}/?`);

    return doc._raw.flattenedPath
        .replace(pattern, '')
        .replace(/\.mdx$/i, '');
}

/**
 * 輔助函數：從文件帶入 LeetCode 特有標籤並與使用者自訂 Tags 作合併取唯一。 (e.g. leetcodeID、difficulty)
 * @param doc 
 * @returns {String[]} 合併後不重複的 Tags
 */
function computeLeetCodeTag(doc: LeetCodeDocForTags): string[] {
    const autoTags = ['LeetCode', doc.leetcodeID.toString(), doc.difficulty];
    const userTags = doc.tags || [];
    return Array.from(new Set([...autoTags, ...userTags]));
}

export const Post = defineDocumentType((documentGroup: DocumentGroup = 'posts') => ({
    name: 'Post',
    filePathPattern: `${documentGroup}/**/*.mdx`,
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
            resolve: (doc) => computeSlug(documentGroup, doc),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/${documentGroup}/${computeSlug(documentGroup, doc)}`,
        }
    },
}));

export const LeetCode = defineDocumentType((documentGroup: DocumentGroup = 'leetcodes') => ({
    name: 'LeetCode',
    filePathPattern: `${documentGroup}/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        leetcodeID: { type: 'number', required: true },
        difficulty: { type: 'enum', options: LEETCODE_DIFFICULTIES, required: true },
        draft: { type: 'boolean', default: false },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => computeSlug(documentGroup, doc),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/${documentGroup}/${computeSlug(documentGroup, doc)}`,
        },
        tags: {
            type: 'list',
            resolve: (doc) => computeLeetCodeTag(doc as unknown as LeetCodeDocForTags),
        }
    }
}));

export const Page = defineDocumentType((documentGroup: DocumentGroup = 'pages') => ({
    name: 'Page',
    filePathPattern: `${documentGroup}/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true }
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => computeSlug(documentGroup, doc),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/${computeSlug(documentGroup, doc)}`,
        }
    }
}));

/**
 * rehype-pretty-code 選項
 * Shiki Theme: https://shiki.style/themes#themes
 */
const prettyCodeOptions = {
    theme: 'one-dark-pro',
    onVisitLine(node: any) {
        if (!node.properties) node.properties = {};
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
        }
        
        const rawText = node.children
            .filter((child: any) => child.type === 'element' && child.children?.[0]?.type === 'text')
            .map((child: any) => child.children[0].value)
            .join('');

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
