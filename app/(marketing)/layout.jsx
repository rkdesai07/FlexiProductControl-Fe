//** React imports */
import React from 'react'

//** Custom imports */
import MarketingNavbar from './_components/marketing-navbar'

const MarketingLayout = ({ children }) => {
  return (
    <div className='h-screen overflow-hidden'>
      <div>
        <MarketingNavbar />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  )
}

export default MarketingLayout