"use client"

//** React imports */
import React, { useEffect, useRef, useState } from 'react';

//** Third party imports */
import { BarChart3, ChevronsLeft, ChevronsRight, CircleUserRound, Factory, HomeIcon, Menu, ShoppingCart } from 'lucide-react';

//** Next-imports */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//** shadcn-ui imports */
import { cn } from '@/lib/utils';

//** Custom imports */
// import WorkspaceInfo from './workspace-info';
import { useMediaQuery } from 'usehooks-ts';
import { Logo } from '@/components/logo/company-logo'


export const MenuItem = ({ icon: Icon, label, active, isCollapsed }) => {
    return (
        <div className={cn('mx-2 mt-[2px] outline-none transition-all')}>
            <div className={cn('flex items-center min-h-[27px] w-full gap-x-2 py-2 hover:bg-primary/10 dark:hover:hover:bg-primary/50 rounded-sm transition-all cursor-pointer text-muted-foreground dark:text-white', active && 'bg-primary/15 dark:bg-primary/50')}>
                <Icon className={'shrink-0 w-[18px] h-[18px] ml-2'} />
                {isCollapsed && <span className='text-start leading-0 text-sm font-medium line-clamp-1'>{label}</span>}
            </div>
        </div>
    )
}

export const navMenu = [
    {
        icon: HomeIcon,
        label: 'Home',
        href: '/home',
        active: false
    },

    {
        icon: BarChart3,
        label: 'View Static',
        href: '/static',
        active: false
    },


    {
        icon: CircleUserRound,
        label: 'Manage Users',
        href: '/user',
        active: false
    },

    {
        icon: Factory,
        label: 'Manage Business',
        href: '/business',
        active: false
    },

    {
        icon: ShoppingCart,
        label: 'Manage Product',
        href: '/product',
        active: false
    },

    {
        icon: HomeIcon,
        label: 'Manage Product Category',
        href: '/product-category',
        active: false
    }
]

const DashboardSidebar = ({ isCollapsed, setIsCollapsed }) => {
    //** State */
    const isMobile = useMediaQuery("only screen and (max-width : 767px)");
    const smallDevice = useMediaQuery("only screen and (max-width : 360px)");
    const isTablet = useMediaQuery(
        "only screen and (min-width : 768px) and (max-width : 1024px)"
    );
    const isDesktop = useMediaQuery(
        "only screen and (min-width : 1025px) and (max-width : 2379px)"
    );
    const isDesktopLarge = useMediaQuery("only screen and (min-width : 2380px)");


    //** Hooks */
    const pathname = usePathname()

    useEffect(() => {
        if (isMobile) {
            setIsCollapsed(false)
        } else if (smallDevice) {
            setIsCollapsed(false)
        } else if ((isTablet) || (isDesktop) || isDesktopLarge) {
            setIsCollapsed(true)
        }
    }, [isMobile, smallDevice])

    const handleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <aside className={cn('bg-secondary dark:bg-secondary/50 h-screen flex flex-col relative transition-all ease-in-out duration-300 group/sidebar no-scrollbar overflow-y-auto', (isCollapsed ? 'w-60' : 'w-12'))}>
            <div className='sticky top-0'>
                {isCollapsed &&
                    <>
                        {<Link href={'/home'}><div className='bg-secondary flex items-center p-3 pl-3 h-[70px] border-r border-primary/10'><Logo /></div></Link>}
                        <div role={'button'} onClick={handleSidebar} className={cn('absolute top-6 right-2 opacity-0 group-hover/sidebar:opacity-100 transition-all cursor-pointer hover:bg-neutral-300 hover:rounded-sm text-muted-foreground', isMobile && "opacity-100")}><ChevronsLeft /></div>
                    </>
                }
                {!isCollapsed && <div role={'button'} onClick={handleSidebar} className={'flex items-center py-6 justify-center text-muted-foreground border-r border-primary/10'}><ChevronsRight className='hover:bg-neutral-300 hover:rounded-sm' /></div>}
            </div>
            {/* <WorkspaceInfo /> */}
            <div className='mt-2'>
                {navMenu?.map((item, index) => (
                    <Link href={item?.href} key={index}>
                        <MenuItem
                            icon={item.icon}
                            label={item?.label}
                            active={item?.href === pathname || item?.active}
                            isCollapsed={isCollapsed}
                        />
                    </Link>
                ))}
            </div>
        </aside>
    )
}

export default DashboardSidebar