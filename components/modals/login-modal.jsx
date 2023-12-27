"use client"

//** React imports */
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUserInfo } from '@/hooks/useUserInfo'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { useFormik } from 'formik'
import { LoginInitialValue, LoginSchema } from '@/schema/login-schema'
import { Eye, EyeOff } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import { cn } from '@/lib/utils'


const LoginModal = () => {
  //** Localstorage imports */
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  //** State */
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  //** Hooks */
  const router = useRouter()
  const { toast } = useToast()
  const { isOpenLogin, onOpenLogin, onCloseLogin, isOpenSignup, onOpenSignup, onCloseSignup } = useUserInfo()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: LoginInitialValue,
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      if (userInfo?.email === values.email && userInfo?.password === values.password) {
        router.push('/w')
        onCloseLogin()
      } else if ((userInfo?.email !== values.email) || (userInfo?.password !== values.password)) {
        toast({
          // title: "Scheduled: Catch up",
          description: "Invalid email or Password",
        })
      }
    }
  })

  const handleSignup = () => {
    onOpenSignup();
    onCloseLogin();
  }

  return (
    <Dialog open={isOpenLogin} onOpenChange={onCloseLogin}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className='text-3xl font-bold text-center mb-4'>LogIn</div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='my-3'>
            <Input
              name='email'
              type='email'
              placeholder='Email'
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span>
              {(errors.email && touched.email) ? <p className='text-red-800 text-xs mx-2 '>{errors.email}</p> : null}
            </span>
          </div>
          <div className='my-3 relative'>
            <Input
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='password'
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span
              className='absolute top-3 right-5'
              role='button'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
            <span>
              {(errors.password && touched.password) ? <p className='text-red-800 text-xs mx-2 '>{errors.password}</p> : null}
            </span>
          </div>
          <div className='flex items-center justify-between mx-2 text-sm'>
            <div className='flex items-center space-x-1'>
              <Checkbox /> <p>Remember Me</p>
            </div>
            <Link role='button' href='#' className='text-blue-500 hover:underline'>Forgot Password?</Link>
          </div>
          <div className='mt-4'>
            <Button
              disabled={isLoading}
              type="submit"
              className={cn("w-full")}>
              Log in
            </Button>
          </div>
          <div className='my-4 text-sm text-center'>
            <span>New Member?</span>&nbsp;<span role='button' onClick={handleSignup} className='text-blue-500 hover:underline cursor-pointer'>Sign Up Now</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal