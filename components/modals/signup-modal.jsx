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
import { SignUpSchema, signUpInitialValues } from '@/schema/signup-schema'


const SignUpModal = () => {
  //** State */
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  //** Hooks */
  const router = useRouter()
  const { toast } = useToast()
  const { isOpenLogin, onOpenLogin, onCloseLogin, isOpenSignup, onOpenSignup, onCloseSignup } = useUserInfo()

  const handleLogin = () => {
    onOpenLogin();
    onCloseSignup();
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values, action) => {
      setIsLoading(true)
      handleLogin()
      localStorage.setItem('userInfo', JSON.stringify(values))
      setIsLoading(false)
    }
  })


  return (
    <Dialog open={isOpenSignup} onOpenChange={onCloseSignup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className='text-2xl font-bold text-center mb-2'>SignUp</div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='my-3'>
            <Input
              name='firstName'
              type='text'
              placeholder='FirstName'
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <span>
              {(errors.firstName && touched.firstName) ? <p className='text-red-800 text-xs mx-2 '>{errors.firstName}</p> : null}
            </span>
          </div>
          <div className='my-3'>
            <Input
              name='lastName'
              type='text'
              placeholder='LastName'
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span>
              {(errors.lastName && touched.lastName) ? <p className='text-red-800 text-xs mx-2 '>{errors.lastName}</p> : null}
            </span>
          </div>
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
          <div className='my-3'>
            <Input
              name='mobile'
              type='text'
              placeholder='Mobile Number'
              value={values.mobile}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span>
              {(errors.mobile && touched.mobile) ? <p className='text-red-800 text-xs mx-2 '>{errors.mobile}</p> : null}
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
          <div className='my-3 relative'>
            <Input
              name='confirm_password'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={values.confirm_password}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span
              className='absolute top-3 right-5'
              role='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </span>
            <span>
              {(errors.confirm_password && touched.confirm_password) ? <p className='text-red-800 text-sm ml-2'>{errors.confirm_password}</p> : null}
            </span>
          </div>
          <div className='flex items-center space-x-2 text-blue-500 text-sm mx-2'>
            <Checkbox /><span>Accept term and conditon.</span>
          </div>
          <div className='my-4'>
            <Button disabled={isLoading} type="submit" className={cn("w-full")}>Sign Up</Button>
          </div>
          <div className='text-center text-sm my-2'>
            <span>Alredy have an account?</span>&nbsp;&nbsp;<span role='button' onClick={handleLogin} className='text-blue-500 hover:underline cursor-pointer'>Instened Login</span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SignUpModal