import React from "react";

type CustomHeadingProps = React.ComponentPropsWithRef<
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
> & { Component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' };

function CustomHeading({
    Component,
    id,
    children,
    ...otherProps
}: CustomHeadingProps) {
    return (
        <Component
            id={id}
            className="group scroll-mt-24 whitespace-pre-wrap"
            {...otherProps}
        >
            <span className="mr-3">
                {React.isValidElement(children) ? children.props.children : children}
            </span>
            <a
                href={id && `#${id}`}
                className="inline-flex h-6 w-6 items-center justify-center rounded-md text-lg text-slate-400 no-underline opacity-0 shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-slate-100 hover:text-slate-700 hover:shadow hover:ring-slate-900/10 group-hover:opacity-100 dark:text-slate-400 dark:ring-slate-400/20 dark:hover:text-slate-700"
                aria-label="Anchor"
            >
                #
            </a>
        </Component>
    )
}

export function CustomH1 (props: React.ComponentPropsWithRef<'h1'>): JSX.Element {
    return <CustomHeading Component="h1" {...props} />
}
export function CustomH2 (props: React.ComponentPropsWithRef<'h2'>): JSX.Element {
    return <CustomHeading Component="h2" {...props} />
}
export function CustomH3 (props: React.ComponentPropsWithRef<'h3'>): JSX.Element {
    return <CustomHeading Component="h3" {...props} />
}
export function CustomH4 (props: React.ComponentPropsWithRef<'h4'>): JSX.Element {
    return <CustomHeading Component="h4" {...props} />
}
export function CustomH5 (props: React.ComponentPropsWithRef<'h5'>): JSX.Element {
    return <CustomHeading Component="h5" {...props} />
}
export function CustomH6 (props: React.ComponentPropsWithRef<'h6'>): JSX.Element {
    return <CustomHeading Component="h6" {...props} />
}
