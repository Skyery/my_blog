import React from 'react';

import { footerConfigs } from '@/configs/footer-config';
import CustomLink from '../ui/custom-link';
import SocialIcon from '@/components/ui/social-icon/SocialIcon';

export default function Footer(): JSX.Element {
    return (
        <footer>
            <div className="mt-16 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">
                    <SocialIcon
                        kind="mail"
                        href={`mailto:${footerConfigs.socialLinks.email}`}
                    />
                    <SocialIcon
                        kind="github"
                        href={footerConfigs.socialLinks.github}
                    />
                </div>

                <div className="mb-8 flex space-x-2 text-sm text-gray-500 transition-colors dark:text-gray-400">
                    <div>{`Copyright © 2022 - ${new Date().getFullYear()}`}</div>
                    <CustomLink href="/">{footerConfigs.credit}</CustomLink>
                </div>
            </div>
        </footer>
    )
}
