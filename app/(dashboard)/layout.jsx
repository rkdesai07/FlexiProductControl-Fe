"use client"

//** React imports */
import React, { useState } from 'react'

//** Custom Imports */
import MainNavbar from './_components/navbar'
import DashboardSidebar from './_components/sidebar'

const MainLayout = ({ children }) => {
  //** State */
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className='flex h-screen overflow-hidden'>
      <DashboardSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <MainNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout