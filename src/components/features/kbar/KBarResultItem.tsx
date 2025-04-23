'use client';

import React, { forwardRef, useMemo } from 'react';
import type { ActionImpl, ActionId } from 'kbar';

interface ResultItemProps {
    action: ActionImpl;
    active: boolean;
    currentRootActionId: ActionId;
}
type Ref = HTMLDivElement;

export const KBarResultItem = forwardRef<Ref, ResultItemProps>(
    ({ action, active, currentRootActionId }, ref) => {
        const ancestors = useMemo(() => {
            if (!currentRootActionId) return action.ancestors;
            const index = action.ancestors.findIndex(
                (ancestor) => ancestor.id === currentRootActionId
            );
            return index === -1 ? action.ancestors : action.ancestors.slice(index + 1);
        }, [action.ancestors, currentRootActionId]);

        return (
            <div
                ref={ref}
                className={`${active
                    ? 'rounded-lg bg-rose-500 text-gray-100'
                    : 'text-gray-600 dark:text-gray-300'
                    } flex cursor-pointer items-center justify-between rounded-lg px-4 py-2`}
            >
                <div className="flex items-center gap-2 text-base">
                    {action.icon && action.icon}
                    <div className="flex flex-col">
                        <div className="line-clamp-1">
                            {ancestors.length > 0 &&
                                ancestors.map((ancestor) => (
                                    <React.Fragment key={ancestor.id}>
                                        <span className="mr-3 opacity-70">{ancestor.name}</span>
                                        <span className="mr-3">›</span>
                                    </React.Fragment>
                                ))}
                            <span>{action.name}</span>
                        </div>
                        {action.subtitle && (
                            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">{action.subtitle}</span>
                        )}
                    </div>
                </div>
                {action.shortcut?.length ? (
                    <div aria-hidden className="grid grid-flow-col gap-2">
                        {action.shortcut.map((sc) => (
                            <kbd
                                key={sc}
                                className={`${active
                                    ? 'bg-white/20 text-gray-100'
                                    : 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                                    } rounded px-1.5 py-0.5 text-xs font-medium`}
                            >
                                {sc}
                            </kbd>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
);

KBarResultItem.displayName = 'KBarResultItem'; // 添加 displayName