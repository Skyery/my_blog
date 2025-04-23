import Image, { ImageProps } from "next/image";

export default function CustomImage({
    src,
    height,
    width,
    base64,
    alt,
    ...otherProps
}: ImageProps & { base64?: string }): JSX.Element | null {
    if (!src) return null;
    if (typeof src === 'string' && (!height || !width)) {
        return (
            <Image
                src={src}
                alt={alt}
                height={height}
                width={width}
                layout="intrinsic"
                {...otherProps}
            />
        );
    }
    return (
        <Image
            layout="responsive"
            src={src}
            alt={alt}
            height={height}
            width={width}
            sizes="(min-width: 40em) 40em, 100vw"
            placeholder={base64 ? 'blur' : 'empty'}
            blurDataURL={base64}
            {...otherProps}
        />
    );
}