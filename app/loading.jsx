"use client"

//** React imports */
import React from 'react'

//** Third party imports */
import { Loader } from 'lucide-react'

const AppSpinner = () => {
    return (
        <div className='w-full h-screen z-50 flex items-center justify-center bg-primary/50 dark:bg-primary/30'>
            <Loader className='w-8 h-8 animate-spin text-slate-100' />
        </div>
    )
}

export default AppSpinner