"use client"

//** React-imports */
import React from 'react'

//** next-imports */
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

//** shadcn-ui imports */
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

//** Custom imports */
import { Icons } from '@/components/icons'
import { useUserInfo } from '@/hooks/useUserInfo'
import { ModeToggle } from '@/components/mode-toggle'
import { Logo } from '@/components/logo/company-logo'

const MarketingNavbar = ({ items }) => {
    //** State */

    //** Hooks */
    const segment = useSelectedLayoutSegment()
    const { isOpenLogin, onOpenLogin, onCloseLogin, isOpenSignup, onOpenSignup, onCloseSignup } = useUserInfo()

    return (
        <div className='bg-primary/40 sticky top-0 py-3'>
            <div className='flex items-center justify-between container'>
                <div className='flex'>
                    <Link href={'/'} className='flex items-center cursor-pointer'><Logo /></Link>
                    {items?.length ? (
                        <nav className='hidden md:flex gap-6 ml-6'>
                            {items?.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item?.href}
                                    className={cn('flex items-center text-lg font-medium sm:text-sm transition-colors dark:text-white hover:text-blue-700',
                                        item.href.startsWith(`/${segment}` && "text-blue-600"
                                        )
                                    )}
                                >{item?.title}<Icons.chevronDown size={15} className='ml-1' /> </Link>
                            ))}
                        </nav>
                    ) : null}
                </div>

                <div className='flex items-center'>
                    {/* <div className='mx-4 flex'>
                        <Button asChild variant={'default'} className={cn('mx-2 dark:text-white')}><Link href="/login">Login</Link></Button>
                        <Button asChild variant='secondary' className={cn('dark:text-white mx-2 hidden md:block')}><Link href="/signup">Sign up</Link></Button>
                    </div> */}
                    <div className='mx-4 flex'>
                        <Button onClick={onOpenLogin} variant={'default'} className={cn('mx-2 dark:text-white')}>Login</Button>
                        <Button onClick={onOpenSignup} variant='secondary' className={cn('dark:text-white mx-2 hidden md:block')}>Sign up</Button>
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default MarketingNavbar