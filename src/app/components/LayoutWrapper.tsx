import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import SectionContainer from "@/app/components/SectionContainer";

export default function LayoutWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
