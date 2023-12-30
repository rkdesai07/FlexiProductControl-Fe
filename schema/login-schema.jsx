import * as Yup from 'yup'

export const LoginSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Please enter valid email.')
        .required('Email is required.'),

    password: Yup
        .string()
        .required('Password is required'),
})

export const LoginInitialValue = {
    email: '',
    password: ''
}