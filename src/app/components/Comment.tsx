"use client";

import { giscusConfigs } from '@/app/configs/giscusConfigs';
import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

export default function Comment() {
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