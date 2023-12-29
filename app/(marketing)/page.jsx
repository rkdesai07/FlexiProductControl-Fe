//** Third party imports */
import { ArrowRight } from 'lucide-react'

//** Utils imports */
import { cn } from '@/lib/utils'

//** Next imports */
import Link from 'next/link'

//** shadcn-ui components imports */
import { Button } from '@/components/ui/button'

const MarketingPage = () => {
  return (
    <div className='px-8 '>
      <div className='w-[700px] h-[300px] container text-center my-10'>
        <p className='text-7xl text-blue-600 font-extrabold text-center text-wrap dark:text-white'>One app to replace them all</p>
        <p className='text-2xl text-rose-900 font-bold text-center text-wrap mt-3 dark:text-white'>Get everyone working in a single platform</p>
        <p className='text-xl text-rose-900 font-normal text-center text-wrap dark:text-white'>designed to manage any type of work.</p>
        <Button asChild className={cn('p-6 text-xl mt-2')}>
          <Link href='/home'>Get Started. It's Free <ArrowRight /></Link>
        </Button>
      </div>
    </div>
  )
}
export default MarketingPage