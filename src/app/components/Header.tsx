import Link from 'next/link';
import React from 'react';

const Header = (): JSX.Element => {
    return (
        <header className="bg-gray-100 dark:bg-gray-800 py-4">
            <nav className="container mx-auto px-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                    我的新部落格
                </Link>
                <div>
                    <Link
                        href="/posts"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
                    >
                        文章
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
