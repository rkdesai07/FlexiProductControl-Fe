import * as Yup from 'yup'

export const ProductCategorySchema = Yup.object().shape({
    categoryName: Yup
        .string()
        .required('Product category name is required.'),

    description: Yup
        .string()
        .notRequired(),

    brandName: Yup
        .string()
        .notRequired(),

    productImage: Yup
        .object()
        .notRequired()
})
