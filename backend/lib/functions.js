import * as Yup from "yup"
export default function val(entity) {
    switch (entity) {
        case "fullname":
            return Yup.string()
                .required("Required")
                .min(5, "Minimum of 5 characters")
                .max(50, "Maximum of 50 characters")
                .matches(/^[a-zA-Z ]+$/, "Only alphabets and spaces are allowed")

        case "username":
            return Yup.string()
                .required("Required")
                .min(3, "Minimum of 3 characters")
                .max(15, "Maximum of 15 characters")
                .matches(/^[a-zA-Z]+$/, "Only alphabets allowed")

        case "email":
            return Yup.string()
                .required("Required")
                .email("Invalid email entered")

        case "password":
            return Yup.string()
                .required("Required")
                .min(8, "Minimum of 8 characters")
                .max(18, "Maximum of 18 characters")
                .matches(/^[\w!@#$]+$/, "Invalid characters used")

        case "gender":
            return Yup.string().required("Required")
                .transform((value) => value?.toLowerCase())
                .oneOf(['male', 'female'], "'Male' or 'Female' should be selected")

        case "dob":
            return Yup.date().required("Required").max(new Date(), "Cannot be in the future")

        case "text":
            return Yup.string().matches(/[\w .?(),]+/, "Not allowed characters present")

        default:
            const _exhaustiveCheck = entity
            return _exhaustiveCheck
    }
}




