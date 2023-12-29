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
        <nav className=' flex items-center bg-secondary h-[50px] py-2'>
            <div className='container flex justify-between items-center'>
                <div className='capitalize text-xl font-medium'>{segment}</div>
                <div className='mx-4 flex items-center'>
                    <Button onClick={onOpenLogin} variant={'default'} className={cn('mx-2 h-8 dark:text-white')}>Login</Button>
                    <UserInfo />
                    <ModeToggle />
                </div>
            </div>
        </nav>
    )
}

export default MainNavbar