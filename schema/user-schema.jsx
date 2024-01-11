import * as Yup from 'yup'

export const userSchema = Yup.object().shape({
    firstname: Yup
        .string()
        .required("FirstName is required.")
        .min(3, "FirstName must be at least 3 characters.")
        .max(25, "FirstName Must be less than 25 characters."),

    lastname: Yup
        .string()
        .required("LastName is required.")
        .min(3, "LastName must be at least 3 characters.")
        .max(25, "LastName Must be less than 25 characters."),

    email: Yup
        .string()
        .email('Please enter valid email.')
        .required('Email is required.'),

    dob: Yup
        .date()
        .max(new Date(), 'Date of birth must be in the past')
        .required('Date of birth is required'),

    username: Yup
        .string()
        .required("UserName is required.")
        .min(3, "UserName must be at least 3 characters.")
        .max(25, "UserName Must be less than 25 characters."),

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