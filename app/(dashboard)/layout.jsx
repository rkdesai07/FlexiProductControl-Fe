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
    <div className=' flex h-screen overflow-hidden'>
      <DashboardSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className='flex h-screen flex-col flex-1'>
        <MainNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className='flex flex-col overflow-y-auto px-4'>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout