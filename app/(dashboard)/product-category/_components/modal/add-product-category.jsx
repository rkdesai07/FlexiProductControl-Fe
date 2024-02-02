"use client"

//** React imports */
import React, { useState } from 'react'

//** Third party imports */
import { useFormik } from 'formik';
import { Trash2 } from 'lucide-react';
import Dropzone from 'react-dropzone';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'

//** Next imports */
import { useRouter } from 'next/navigation'

//** shadcn-ui imports */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '../../../../../components/ui/use-toast'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet"

//** Custom imports */
import useProductCategory from '@/hooks/use-product-category-store'
import { ProductCategorySchema } from '@/schema/product-category-schema'

const AddProductCategoryModal = () => {
    //** State */
    const [isLoading, setIsLoading] = useState(false);

    //** Hooks */
    const router = useRouter()
    const { toast } = useToast()
    const {
        addProductCategory,
        productCategoryData,
        updateProductCategory,
        productCategoryInitialValue,
        isOpenProductCategoryDrawer,
        onCloseProductCategoryDrawer,
    } = useProductCategory()

    // console.log('userInitialValue', userInitialValue)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: productCategoryInitialValue,
        validationSchema: ProductCategorySchema,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            setIsLoading(true);
            if (Object.keys(errors).length === 0) {
                if (values?.id !== "" && values?.id !== null) {
                    updateProductCategory(values?.id, values);
                } else if (values?.id === "") {
                    let temp = { ...values, id: productCategoryData.length + 1 }
                    addProductCategory(temp);
                    toast({
                        title: "Product category added successfully.",
                    });
                }
                action.resetForm(productCategoryInitialValue);
                onCloseProductCategoryDrawer();
                setIsLoading(false);
            } else {
                setIsLoading(false)
            }
        }
    })

    // console.log('errors', errors)
    // console.log('values', values)


    return (
        <Sheet open={isOpenProductCategoryDrawer} onOpenChange={onCloseProductCategoryDrawer}>
            <SheetContent className="sm:max-w-md mt-5">
                <SheetHeader>
                    <div className='text-2xl font-bold text-start'>Add Product Category</div>
                </SheetHeader>
                <form onSubmit={handleSubmit} className='mt-8'>
                    <div className='grid gap-5 my-5'>
                        <div className='relative'>
                            <Input
                                name='categoryName'
                                type='text'
                                placeholder='Category Name'
                                value={values.categoryName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <span>
                                {(errors.categoryName && touched.categoryName) ? <p className='text-red-800 text-xs mx-2 '>{errors.categoryName}</p> : null}
                            </span>
                        </div>
                        <div>
                            <Input
                                name='description'
                                type='text'
                                placeholder='Description'
                                value={values.description}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <span>
                                {(errors.description && touched.description) ? <p className='text-red-800 text-xs mx-2 '>{errors.description}</p> : null}
                            </span>
                        </div>
                        <div>
                            <Input
                                name='brandName'
                                type='brandName'
                                placeholder='Brand Name'
                                value={values.brandName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            <span>
                                {(errors.brandName && touched.brandName) ? <p className='text-red-800 text-xs mx-2 '>{errors.brandName}</p> : null}
                            </span>
                        </div>
                        {values?.image?.length === 0 ?
                            <div>
                                <Dropzone onDrop={acceptedFiles => setFieldValue('image', acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <div className='flex justify-end'><Button type='button'>Upload image</Button></div>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                            : <>
                                {values.image && values.image.map((item, index) => {
                                    return (
                                        <div key={item} className='flex items-center'>
                                            <div>
                                                <Zoom>
                                                    <img
                                                        src={URL.createObjectURL(item)}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </Zoom>
                                            </div>
                                            <Trash2 />
                                        </div>
                                    )
                                })}
                            </>}
                    </div>
                    <SheetFooter>
                        <SheetClose><Button type='button' variant={"outline"}>Cancel</Button></SheetClose>
                        <Button disabled={isLoading} type="submit">{productCategoryInitialValue?.id === "" ? "Submit" : "Update"}</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default AddProductCategoryModal