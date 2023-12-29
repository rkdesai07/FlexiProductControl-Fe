"use client"

//** React imports */
import React from 'react'

//** Third party imports */
import { ChevronDown, Settings } from 'lucide-react'

//** shacn-ui imports */
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

//** Custom imports */
import MenuItem from './menu-item'

const UserInfo = () => {
    //** State */

    const userName = 'Mahesh Vadecha'
    return (
        <Popover>
            <PopoverTrigger>
                <div className='flex items-center text-sm text-muted-foreground p-2 border-b-2'>
                    <div className='flex items-center gap-x-2'>
                        <Avatar className='w-8 h-8'>
                            <AvatarFallback className='bg-primary text-white font-medium text-xs'>MV</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className={cn('w-60')}>
                <div className='flex flex-col text-sm text-muted-foreground gap-y-2'>
                    <div className='flex items-center gap-x-2 w-full'>
                        <Avatar className='w-8 h-8'>
                            <AvatarFallback className='bg-primary text-white font-medium text-xs'>MV</AvatarFallback>
                        </Avatar>
                        <div className='space-y-0'>
                            <span className='items-start font-medium line-clamp-1'>{userName}</span>
                            <span className='items-start line-clamp-1 text-xs leading-none'>{'Free For 10 member'}</span>
                        </div>
                    </div>
                    <div className=''>
                        <MenuItem icon={Settings} label={"settings"} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default UserInfo