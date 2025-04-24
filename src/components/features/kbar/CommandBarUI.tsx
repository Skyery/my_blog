'use client';

import React from 'react';
import {
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarResults,
    useMatches,
} from 'kbar';
import { KBarSearchInput } from './KBarSearchInput';
import { KBarResultItem } from './KBarResultItem';

// 渲染結果列表的邏輯
function RenderResults() {
    const { results, rootActionId } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className="px-4 pt-4 pb-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400 tracking-wider">
                        {item}
                    </div>
                ) : (
                    <KBarResultItem
                        action={item}
                        active={active}
                        currentRootActionId={rootActionId || ''}
                    />
                )
            }
        />
    );
}

// 命令面板的整體 UI 結構
export function CommandBarUI(): JSX.Element {
    return (
        <KBarPortal>
            <KBarPositioner className="fixed inset-0 z-50 bg-black/50 p-4 backdrop-blur-sm">
                <KBarAnimator className="mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
                    <KBarSearchInput
                        defaultPlaceholder="全站搜尋或輸入命令..."
                        className="w-full border-b border-gray-200 bg-transparent px-4 py-3 text-gray-800 focus:outline-none dark:border-gray-700 dark:text-gray-200"
                    />
                    <div className="max-h-[400px] overflow-y-auto">
                       <RenderResults />
                    </div>
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
}