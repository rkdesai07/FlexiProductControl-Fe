"use client"

//** React imports */
import React, { useState } from 'react'

//** Third party imports */
import { useFormik } from 'formik'
import { Eye, EyeOff } from 'lucide-react'

//** Next imports */
import { useRouter } from 'next/navigation'

//** shadcn-ui imports */
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

//** Custom imports */
import { useUserManagement } from '@/hooks/useUserManage'
import { AddUserInitialValues, AddUserSchema } from '@/schema/add-user-schema'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const AddUser = () => {
    //** State */
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    //** Hooks */
    const router = useRouter()
    const { isOpenUserDrawer, onOpenUserDrawer, onCloseUserDrawer } = useUserManagement()

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, se } = useFormik({
        initialValues: AddUserInitialValues,
        validationSchema: AddUserSchema,
        onSubmit: (values, action) => {
            alert(values)
        }
    })

    return (
        <Sheet open={isOpenUserDrawer} onOpenChange={onCloseUserDrawer}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <div className='text-2xl font-bold text-start mt-3'>Add User</div>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-5 mt-5'>
                        <div>
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
                                        // onChange={handleChange}
                                        onSelect={handleChange}
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
                        <div className='space-x-4 flex justify-end'>
                            <SheetFooter>
                                <SheetClose><Button type={'button'} onClick={onCloseUserDrawer} variant={"outline"}>Cancel</Button></SheetClose>
                                <Button disabled={isLoading} type="submit">Submit</Button>
                            </SheetFooter>
                        </div>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default AddUser