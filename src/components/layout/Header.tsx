import CustomLink from "@/components/ui/custom-link/CustomLink";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import SectionContainer from "@/components/layout/SectionContainer";
import MobileNav from "@/components/layout/MobileNav";
import CommandPaletteToggle from '@/components/features/kbar/kbarCommandToggle';
import { headerConfigs } from "@/configs/header-config";

export default function Header(): JSX.Element {
    return (
        <header className="sticky top-0 z-10 border-b border-slate-900/10 bg-white/70 py-3 backdrop-blur transition-colors dark:border-slate-50/[0.06] dark:bg-gray-900/60">
            <SectionContainer>
                <div className="flex items-baseline justify-between">
                    <div>
                        <CustomLink href="/" aria-label={headerConfigs.title}>
                            <div className="flex items-center justify-between">
                                <div className="h-6 text-2xl font-semibold sm:block">
                                    {headerConfigs.title}
                                </div>
                            </div>
                        </CustomLink>
                    </div>

                    <div className="flex items-center text-base leading-5 sm:gap-1">
                        <div className="hidden gap-1 sm:flex">
                            {headerConfigs.navLinks.map((link) => (
                                <CustomLink
                                    key={link.title}
                                    href={link.href}
                                    className="rounded p-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                                >
                                    {link.title}
                                </CustomLink>
                            ))}
                        </div>

                        <ThemeSwitch />
                        <CommandPaletteToggle />
                        <MobileNav />
                    </div>
                </div>
            </SectionContainer>
        </header>
    );
}