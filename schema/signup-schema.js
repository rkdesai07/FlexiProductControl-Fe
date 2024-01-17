import * as Yup from 'yup'

export const SignUpSchema = Yup.object().shape({
    firstName: Yup
        .string()
        .required("FirstName is required.")
        .min(3, "FirstName must be at least 3 characters.")
        .max(25, "FirstName Must be less than 25 characters."),

    lastName: Yup
        .string()
        .required("LastName is required.")
        .min(3, "LastName must be at least 3 characters.")
        .max(25, "LastName Must be less than 25 characters."),

    email: Yup
        .string()
        .email('Please enter valid email.')
        .required('Email is required.'),

    mobile: Yup
        .string()
        .matches(/^\d{10}$/, 'Invalid mobile number.')
        .required('Mobile Number is required.'),

    password: Yup
        .string()
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one special character, one digit, and be at least 8 characters long.'
        )
        .required('Password is required.'),

    confirm_password: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required.'),
})

export const signUpInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: ''
}