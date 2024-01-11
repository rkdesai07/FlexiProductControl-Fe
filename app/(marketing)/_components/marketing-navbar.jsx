"use client"

//** React-imports */
import React from 'react';

//** Custom imports */
import { ModeToggle } from '@/components/mode-toggle';
import { Logo } from '@/components/logo/company-logo';

const MarketingNavbar = () => {
    return (
        <div className='bg-primary/40 fixed w-full top-0 py-3'>
            <div className='flex items-center justify-between container'>
                <Logo />
                <ModeToggle />
            </div>
        </div>
    )
}

export default MarketingNavbar