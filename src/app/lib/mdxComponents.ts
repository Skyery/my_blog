import {
    CustomH1,
    CustomH2,
    CustomH3,
    CustomH4,
    CustomH5,
    CustomH6,
} from '@/app/components/CustomHeading';
import CustomPre from '@/app/components/CustomPre';
import CustomLink from '@/app/components/CustomLink';
import CustomImage from '@/app/components/CustomImage';

const mdxComponents = {
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    h4: CustomH4,
    h5: CustomH5,
    h6: CustomH6,
    pre: CustomPre,
    a: CustomLink,
    img: CustomImage
};

export default mdxComponents;