import Header from './Header';
import Footer from './Footer';
import SectionContainer from './SectionContainer';
import React from 'react';

export default function LayoutWrapper({
    children
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <div className="flex min-h-screen w-full flex-col justify-between">
            <div>
                <Header />

                <SectionContainer>
                    <main className="mb-auto">{children}</main>
                </SectionContainer>
            </div>

            <Footer />
        </div>
    );
}