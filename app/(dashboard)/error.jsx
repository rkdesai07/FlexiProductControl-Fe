"use client"

//** React imports */
import React from 'react'

//** Next imports */
import Link from 'next/link'

//** shadcn-ui imports */
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Error = () => {
    return (
        <div className='container h-screen flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-bold'>Somthing went Wrong! [ dashboard ]</h2>
            <div className=''>
                <Button asChild className={cn('w-25')}>
                    <Link href={'/'}>Go Back</Link>
                </Button>
            </div>
        </div>
    )
}

export default Error