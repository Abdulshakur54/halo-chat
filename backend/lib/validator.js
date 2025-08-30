import y from 'yup'
export const semail = y.string().required().trim().email().lowercase()
export const spassword = y.string().required().min(8)
export const sfullName = y.string().trim().required().min(3).matches(/^[a-z A-Z]+$/)
export const sbio = y.string().required().max(100).matches(/[\w .?(),]+/)
export const stext = y.string().required().matches(/[\w .?(),]+/)