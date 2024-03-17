'use client';

import { ThemeProvider as Theme } from "next-themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ThemeProviders = ({ children } : Readonly<{children : React.ReactNode}>) => {
    return <Theme attribute="class">{children}</Theme>
}

const NprogressProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ProgressBar options={{ showSpinner: false }} />
        </>
    );
};

export {
    ThemeProviders,
    NprogressProvider,
};