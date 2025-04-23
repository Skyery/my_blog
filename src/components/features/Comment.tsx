"use client";

import { giscusConfigs } from '@/configs/giscusConfigs';
import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

export default function Comment(): JSX.Element {
    const { theme } = useTheme();

    return (
        <Giscus
            repo={giscusConfigs.repo}
            repoId={giscusConfigs.repoId}
            category={giscusConfigs.category}
            categoryId={giscusConfigs.categoryId}
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={theme === "dark" ? "transparent_dark" : "light"}
            loading="lazy"            
        />
    );
}
