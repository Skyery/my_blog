import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import imageMetadata from './src/app/plugins/imageMetadata';

import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/**/*.mdx`,
    contentType: "mdx",
    bodyType: "none",
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        slug: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
    },
    computedFields: {
        path: {
            type: 'string',
            resolve: (post) => `/posts/${post.slug}`,
        },
    },
}));

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
    mdx: {
        rehypePlugins: [
            rehypeSlug,
            rehypeCodeTitles,
            imageMetadata,
            [rehypePrism, { ignoreMissing: true }],
            [rehypeAutolinkHeadings, { behavior: 'wrap' }]
        ],
    },
});