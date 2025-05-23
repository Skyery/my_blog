import Link from "next/link";
import ExternalLinkIcon from './external-link.svg';

export default function CustomLink({
    href,
    children,
    ...rest
}: React.ComponentPropsWithoutRef<'a'>): JSX.Element {
    const isInternalLink = href && href.startsWith('/');
    const isAnchorLink = href && href.startsWith('#');

    if(isInternalLink){
        return (
            <Link href={href} {...rest}>
                {children}
            </Link>
        );
    }

    if (isAnchorLink) {
        return (
            <a href={href} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
            {children}
            {typeof children === 'string' && (
                <ExternalLinkIcon className="ml-1 inline-block h-4 w-4" />
            )}
        </a>
    );
}
