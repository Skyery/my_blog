
export default function SectionContainer({
    children
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <div className="mx-auto max-w-full px-4 sm:px-6 md:max-w-3xl lg:max-w-5xl">
            {children}
        </div>
    );
}
