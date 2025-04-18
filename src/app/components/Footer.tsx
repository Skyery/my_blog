import React from 'react';

const Footer = (): JSX.Element => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p>
                    © {`Copyright © 2022 - ${new Date().getFullYear()}`} Jason Lin. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
