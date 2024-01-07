"use client"

//** React imports */
import React, { useState } from 'react'

//** Custom imports */
import UserTable from './_components/user-table'
import { UserData } from './_components/user-data'
import { UserTableColumns } from './_components/columns'

const UserPage = () => {
  //** State */
  const [data, setData] = useState(UserData)

  return (
    <div className='h-screen'>
      <UserTable columns={UserTableColumns} data={data} />
    </div>
  )
}

export default UserPage