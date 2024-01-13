"use client"

//** React imports */
import React, { use, useEffect, useState } from 'react'

//** Third party imports */
import { useFormik } from 'formik'
import { format } from "date-fns"
import { Eye, EyeOff } from 'lucide-react'
import { Calendar as CalendarIcon } from "lucide-react"

//** Next imports */
import { useRouter } from 'next/navigation'

//** shadcn-ui imports */
import { cn } from '@/lib/utils'
import { useToast } from '../../../../../components/ui/use-toast'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet"

//** Custom imports */
import { userSchema } from '@/schema/user-schema'
import useUserStore from '@/hooks/use-user-store'

const AddUserModal = () => {
    //** State */
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    //** Hooks */
    const router = useRouter()
    const { toast } = useToast()
    const {
        isOpenUserDrawer,
        onCloseUserDrawer,
        userInitialValue,
        userData,
        addUser,
        updateUser,
        deleteUser
    } = useUserStore()

    // console.log('userInitialValue', userInitialValue)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: userInitialValue,
        validationSchema: userSchema,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            setIsLoading(true);
            if (Object.keys(errors).length === 0) {
                if (values?.id !== "" && values?.id !== null) {
                    updateUser(values?.id, values);
                } else if (values?.id === "") {
                    let temp = { ...values, id: userData.length + 1 }
                    addUser(temp);
                    toast({
                        title: "User added successfully.",
                    });
                }
                action.resetForm(userInitialValue);
                onCloseUserDrawer();
                setIsLoading(false);
            } else {
                setIsLoading(false)
            }
        }
    })

    // console.log('error', errors)

    return (
        <Sheet open={isOpenUserDrawer} onOpenChange={onCloseUserDrawer}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <div className='text-2xl font-bold text-start'>Add User</div>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-5 my-5'>
                        <div className='relative'>
                            <Input
                                name='firstname'
                                type='text'
                                placeholder='FirstName'
                                value={values.firstname}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <span>
                                {(errors.firstname && touched.firstname) ? <p className='text-red-800 text-xs mx-2 '>{errors.firstname}</p> : null}
                            </span>
                        </div>
                        <div>
                            <Input
                                name='lastname'
                                type='text'
                                placeholder='LastName'
                                value={values.lastname}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <span>
                                {(errors.lastname && touched.lastname) ? <p className='text-red-800 text-xs mx-2 '>{errors.lastname}</p> : null}
                            </span>
                        </div>
                        <div>
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
                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !values.dob && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {values.dob ? format(values.dob, "PPP") : <span>Date Of Birth</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Calendar
                                        mode="single"
                                        selected={values?.dob}
                                        onSelect={(value) => setFieldValue("dob", new Date(value))}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Input
                                name='username'
                                type='text'
                                placeholder='UserName'
                                value={values.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <span>
                                {(errors.username && touched.username) ? <p className='text-red-800 text-xs mx-2 '>{errors.username}</p> : null}
                            </span>
                        </div>
                        <div className='relative'>
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
                        {/* <div className='relative'>
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
                                {(errors.confirm_password && touched.confirm_password) ? <p className='text-red-800 text-xs mx-2 '>{errors.confirm_password}</p> : null}
                            </span>
                        </div> */}
                    </div>
                    <SheetFooter>
                        <SheetClose><Button type='button' variant={"outline"}>Cancel</Button></SheetClose>
                        <Button disabled={isLoading} type="submit">Submit</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default AddUserModal