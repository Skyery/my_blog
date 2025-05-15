import clsx from 'clsx';
import {
    socialIconMap as components,
    socialIconColorMap,
    SocialIconProps
} from './social-icon.model';

export default function SocialIcon({
    kind,
    href
}: SocialIconProps): JSX.Element | null {
    if (!href) return null;
    if (kind === 'mail') {
        const email = href.replace(/^mailto:/, '');
        const isValidEmail = /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
        if (!isValidEmail) {
            return null;
        }
    }

    const SocialSvg = components[kind];

    return (
        <a
            className="text-sm text-gray-500 transition-colors hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span className="sr-only">{kind}</span>
            <SocialSvg
                className={clsx(
                    'h-6 w-6 fill-current text-gray-700 transition-colors dark:text-gray-200',
                    socialIconColorMap[kind]
                )}
            />
        </a>
    );
}
