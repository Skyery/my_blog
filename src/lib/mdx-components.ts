import {
    CustomH1,
    CustomH2,
    CustomH3,
    CustomH4,
    CustomH5,
    CustomH6,
} from '@/components/mdx/CustomHeading';
import CustomCopy from '@/components/mdx/CustomCopy';
import CustomLink from '@/components/ui/custom-link/CustomLink';
import CustomImage from '@/components/mdx/CustomImage';

const mdxComponents = {
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    h4: CustomH4,
    h5: CustomH5,
    h6: CustomH6,
    pre: CustomCopy,
    a: CustomLink,
    img: CustomImage
};

export default mdxComponents;