"use client"

//** React-imports */
import React from 'react'

//** Third party imports */

//** Next imports */
import { useSelectedLayoutSegments } from 'next/navigation'

//** shadcn-ui imports */
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

//** Custom imports */
import UserInfo from './user-info'
import { useUserInfo } from '@/hooks/useUserInfo'
import { ModeToggle } from '@/components/mode-toggle'

const MainNavbar = ({ isCollapsed, setIsCollapsed }) => {
    //** Hooks */
    const segment = useSelectedLayoutSegments()
    const { isOpenLogin, onOpenLogin, onCloseLogin, isOpenSignup, onOpenSignup, onCloseSignup } = useUserInfo()

    const hadleCollapse = () => {
        setIsCollapsed(true)
    }

    return (
        <nav className='px:3 md:px-6 flex items-center justify-between bg-secondary h-[50px] py-3'>
            <div className='capitalize text-sm md:text-xl font-medium'>{'Devki Nandan Trading'}</div>
            <div className='mx-4 flex items-center'>
                <UserInfo />
                <ModeToggle />
            </div>
        </nav>
    )
}

export default MainNavbar