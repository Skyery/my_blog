'use client';

import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

import { KBarProvider } from 'kbar';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { generateKBarActions } from '@/components/features/kbar/kbar-actions';
import { CommandBarUI } from '@/components/features/kbar/CommandBarUI';

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
    return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
}

export function BprogressProvider({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            {children}
            <ProgressProvider options={{ showSpinner: false }} />
        </>
    );
}

export function KBarProviderWrapper({ children }: { children: React.ReactNode }): JSX.Element {
    const router = useRouter();
    const { setTheme } = useTheme();

    const actions = generateKBarActions(router, setTheme);

    return (
        <KBarProvider actions={actions}>
            <CommandBarUI />
            {children}
        </KBarProvider>
    );
}