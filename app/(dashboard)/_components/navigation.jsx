"use client"

import { cn } from '@/lib/utils';
import { ChevronsLeft, Menu } from 'lucide-react';

//** React imports */
import React, { useRef, useState } from 'react';
import WorkspaceInfo from './workspace-info';
import { useMediaQuery } from '@uidotdev/usehooks';

const Navigation = () => {
    //** State */
    const isMobile = useMediaQuery("(max-width:768px)");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isResetting, setIsResettig] = useState(isMobile);

    //** Hooks */
    const navbarRef = useRef();
    const sidebarRef = useRef();

    const collapse = () => {
        console.log('cal')
        setIsCollapsed(true)
    }

    return (
        <>
            <aside ref={sidebarRef} className={cn('bg-slate-400 w-60 group/sidebar relative')}>
                <div className='h-full overflow-y-auto'>
                    <div role='button' onClick={collapse} className={cn('w-6 h-6 absolute top-3 right-2 hover:bg-neutral-300 hover:rounded opacity-0 group-hover/sidebar:opacity-100 transition-all')}>
                        <ChevronsLeft className={'w-6 h-6 text-muted-foreground'} />
                    </div>
                    <WorkspaceInfo />
                </div>
            </aside>
            <div ref={navbarRef} className={cn('py-3 absolute top-0 left-60 w-[calc(100%-240px)]')}>
                <nav className='flex items-center'>
                    {isCollapsed && (
                        <div role='button' className={cn('w-6 h-6 flex items-center justify-center hover:bg-neutral-300 hover:rounded transition-all cursor-pointer')}>
                            <Menu className={'w-5 h-5 text-muted-foreground'} />
                        </div>
                    )}
                </nav>
            </div>
        </>
    )
}

export default Navigation