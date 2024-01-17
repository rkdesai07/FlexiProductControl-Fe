"use client"

//** React-imports */
import React, { useEffect, useState } from 'react'

//** Custom imports */
import LoginModal from '../modals/login-modal'
import SignUpModal from '../modals/signup-modal'
import AddUser from '../../app/(dashboard)/user/_components/modal/add-user'
import AddProductCategoryModal from '@/app/(dashboard)/product-category/_components/modal/add-product-category'

export const ModalProvider = () => {
  //** State */
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <LoginModal />
      <SignUpModal />
      <AddUser />
      <AddProductCategoryModal />
    </>
  )
}
