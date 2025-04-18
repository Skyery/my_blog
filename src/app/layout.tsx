import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '我的新部落格',
    description: '記錄技術與生活',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-TW" className="light" style={{ colorScheme: 'light' }}>
            <body
                className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}
            >
                <Header />
                <main className="container mx-auto px-4 py-8 min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
