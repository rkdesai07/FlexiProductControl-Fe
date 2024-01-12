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
    <div className='max-w-screen-2xl max-h-[98vh] mx-auto flex h-screen overflow-hidden border-2'>
      <DashboardSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex flex-1 flex-col">
        <MainNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className='flex flex-col flex-1 px-5 overflow-auto'>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout