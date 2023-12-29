//** React imports */
import React from 'react'

//** shadcn-ui imports */
import { cn } from '@/lib/utils'

export const MenuItem = ({ icon: Icon, label }) => {
  return (
    <div className={cn('mt-[2px] outline-none')}>
      <div className={cn('flex items-center min-h-[27px] w-full gap-x-2 py-2 hover:bg-primary/10 rounded-sm transition-all cursor-pointer text-muted-foreground')}>
        <Icon className={'shrink-0 w-[18px] h-[18px] ml-2'} />
        <span className='text-start leading-none text-sm font-medium line-clamp-1'>{label}</span>
      </div>
    </div>
  )
}

export default MenuItem