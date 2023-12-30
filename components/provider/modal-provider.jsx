"use client"

//** React-imports */
import React, { useEffect, useState } from 'react'

//** Custom imports */
import LoginModal from '../modals/login-modal'
import SignUpModal from '../modals/signup-modal'

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
    </>
  )
}
