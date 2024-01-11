"use client"

//** React imports */
import React, { useState } from 'react'

//** Custom imports */
import UserTable from './_components/user-table'

const UserPage = () => {
  return (
    <div className='h-screen'>
      <UserTable/>
    </div>
  )
}

export default UserPage