'use client';

import { useState } from "react";
import CustomLink from "@/components/ui/custom-link/CustomLink";
import { headerConfigs } from "@/configs/header-config";

export default function MobileNav(): JSX.Element {
    const [navShow, setNavShow] = useState(false);

    const onToggleNav = () => {
        setNavShow((status) => {
            if (status) {
                document.body.style.overflowY = 'auto';
            } else {
                document.body.style.overflowY = 'hidden';
            }
            return !status;
        });
    }

    return (
        <div className="sm:hidden">
            <button
                type="button"
                className="h-10 w-10 rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:h-12 sm:w-12 sm:p-3"
                aria-label="Toggle Menu"
                onClick={onToggleNav}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-gray-900 transition-colors dark:text-gray-100"
                >
                    {navShow ? (
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    ) : (
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    )}
                </svg>
            </button>

            <div
                className={`fixed top-16 right-0 h-screen w-full bg-gray-200/90 transition-all duration-300 ease-in-out dark:bg-gray-800/90 ${navShow ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <nav className="mt-8 h-full w-full">
                    {headerConfigs.navLinks.map((link) => (
                        <CustomLink
                            href={link.href}
                            key={link.title}
                            className="block px-12 py-4 text-2xl font-bold tracking-widest text-gray-900 transition-colors hover:bg-gray-300 dark:text-gray-100 dark:hover:bg-gray-700"
                            onClick={onToggleNav}
                        >
                            {link.title}
                        </CustomLink>
                    ))}
                </nav>
            </div>
        </div>
    )
}
