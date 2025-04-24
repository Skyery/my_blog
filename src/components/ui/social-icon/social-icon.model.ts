import Mail from './icons/mail.svg';
import Github from './icons/github.svg';
import Facebook from './icons/facebook.svg';
import Linkedin from './icons/linkedin.svg';
import Twitter from './icons/twitter.svg';

export type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export const socialIconMap = {
    mail: Mail as SVGComponent,
    github: Github as SVGComponent,
    facebook: Facebook as SVGComponent,
    linkedin: Linkedin as SVGComponent,
    twitter: Twitter as SVGComponent
} as const satisfies Record<string, SVGComponent>;

export const socialIconColorMap = {
    mail: 'hover:text-primary-600 dark:hover:text-primary-400',
    github: 'hover:text-gray-500 dark:hover:text-gray-400',
    facebook: 'hover:text-[#4267B2] dark:hover:text-[#4267B2]',
    linkedin: 'hover:text-[#0e76a8] dark:hover:text-[#0e76a8]',
    twitter: 'hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2]',
} as const satisfies Record<SocialKind, string>;

export type SocialKind = keyof typeof socialIconMap;

export interface SocialIconProps {
    kind: SocialKind;
    href: string;
}
