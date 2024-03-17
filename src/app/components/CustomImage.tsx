import Image, { ImageProps } from "next/image";

export default function CustomImage({
    src,
    height,
    width,
    base64,
    alt,
    ...otherProps
}: ImageProps & { base64?: string }) {
    if (!src) return null;
    if (typeof src === 'string' && (!height || !width)) {
        return (
            <img src={src} height={height} width={width} alt={alt} {...otherProps} />
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