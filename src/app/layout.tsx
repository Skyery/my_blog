import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.scss';
import { ThemeProvider, BprogressProvider, KBarProviderWrapper } from '@/app/providers';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Jason's Note",
    description: '這裡是紀錄我自學及工作上點點滴滴的筆記本。',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <html lang="zh-TW" className="light" style={{ colorScheme: 'light' }}>
            <body className={inter.className}>
                <ThemeProvider>
                    <KBarProviderWrapper>
                        <BprogressProvider>
                            <LayoutWrapper>{children}</LayoutWrapper>
                        </BprogressProvider>
                    </KBarProviderWrapper>
                </ThemeProvider>
            </body>
        </html>
    );
}
