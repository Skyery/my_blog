import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@/app/styles/prism-dracula.css';
import '@/app/styles/prism-plus.css';
import '@/app/styles/nprogress-custom.scss';
import { ThemeProviders, NprogressProvider } from "./providers";
import LayoutWrapper from "./components/LayoutWrapper";
import CommandPalette from '@/app/components/CommandPalette';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Jason's Blog",
    description: "這裡是紀錄我自學及工作上點點滴滴的筆記本。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light" style={{ colorScheme: 'light' }}>
            <body className={inter.className}>
                <ThemeProviders>
                    <CommandPalette>
                        <NprogressProvider>
                            <LayoutWrapper>
                                {children}
                            </LayoutWrapper>
                        </NprogressProvider>
                    </CommandPalette>
                </ThemeProviders>
            </body>
        </html>
    );
}
