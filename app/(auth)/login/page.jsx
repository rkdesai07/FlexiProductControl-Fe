"use client"

//** React-imports */
import React, { useState } from 'react';

//** Third party imports */
import { useFormik } from 'formik';

//** next-imports */
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//** shadcn-ui components imports */
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";

//** Custom imports */
import { useToast } from '@/components/ui/use-toast';
import LoadingSpinner from '@/components/common/spinner';
import { LoginInitialValue, LoginSchema } from '@/schema/login-schema';
import { Loader } from 'lucide-react';

const LoginPage = () => {
  //** State */
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //** login credential */
  const credential = {
    email: 'mayur123@gmail.com',
    pwd: 'Mayur@123'
  }

  //** Hooks */
  const router = useRouter();
  const { toast } = useToast();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: LoginInitialValue,
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      setIsLoading(true)
      setTimeout(() => {
        if (credential?.email === values.email && credential?.pwd === values.password) {
          router.push('/home');
          setIsLoading(false);
        } else if ((credential?.email !== values.email) || (credential?.pwd !== values.password)) {
          toast({
            variant: 'destructive',
            description: "Invalid email or Password",
          });
          setIsLoading(false);
        }
      }, 6000)
    }
  })

  return (
    <div className='h-screen flex items-center justify-center container'>
      {isLoading ? <LoadingSpinner /> : null}
      <Card className={cn('p-10 w-[500px] shadow-slate-400 shadow-2xl')}>
        <div className='text-3xl font-bold text-center mb-4'>LogIn</div>
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
              {(errors.email && touched.email) ? <p className='text-red-800 dark:text-white text-xs mx-2 '>{errors.email}</p> : null}
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
              {showPassword ? <Icons.eye size={16} /> : <Icons.eyeClose size={16} />}
            </span>
            <span>
              {(errors.password && touched.password) ? <p className='text-red-800 dark:text-white text-xs mx-2 '>{errors.password}</p> : null}
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
          {/* <div className='my-4 text-sm text-center'>
            <span>New Member?</span>&nbsp;<Link href='/signup' className='text-blue-500 hover:underline'>Sign Up Now</Link>
          </div> */}
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
