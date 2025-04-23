import clsx from "clsx";
import styles from "./PostBody.module.scss";

export default function PostBody({
    children
}: Readonly<{
    children: React.ReactNode
}>): JSX.Element {
    return (
        <div
            className={clsx(
                'prose mx-auto transition-colors dark:prose-invert',
                styles.postBody
            )}
        >
            {children}
        </div>
    );
}