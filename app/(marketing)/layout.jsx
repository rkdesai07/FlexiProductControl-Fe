//** React imports */
import React from 'react'

//** Custom imports */
import { marketingConfig } from '@/config/marketing'
import MarketingNavbar from './_components/marketing-navbar'

const MarketingLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <MarketingNavbar items={marketingConfig.mainNav} />
      <main className='flex-1'>{children}</main>
    </div>
  )
}

export default MarketingLayout