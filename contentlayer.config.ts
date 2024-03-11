import { defineDocumentType, makeSource } from './src/lib/contentLayerAdapter';

export const Post = defineDocumentType(() => ({
    name: 'Post',
    // filePathPattern: `content/posts/**/*.mdx`,
    filePathPattern: `**/**/*.mdx`,
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
            // resolve: (post) => `/posts/${post.slug}`,
            resolve: (post) => `/posts/${post._raw.flattenedPath}`,
        },
    },
}));

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Post],
});