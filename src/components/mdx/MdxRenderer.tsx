'use client';

import React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import mdxComponents from '@/lib/mdx-components';

type MDXComponents = Record<string, React.ComponentType<unknown>>;

interface MdxRendererProps {
    code: string;
}

export function MdxRenderer({ code }: MdxRendererProps): JSX.Element {
    const MDXContent = useMDXComponent(code);

    return <MDXContent components={mdxComponents as MDXComponents} />;
}
