import mongoose from 'mongoose';
import y from 'yup'

y.addMethod(y.string, 'isObjectId', function (message = 'Invalid ID') {
    return this.test('is-object-id', message, function (value) {
        const { path, createError } = this;
        return value && !mongoose.Types.ObjectId.isValid(value) ? createError({ path, message }) : true
    })
})

export const semail = y.string().required().trim().email().lowercase()
export const spassword = y.string().required().min(8)
export const sfullName = y.string().trim().required().min(3).matches(/^[a-z A-Z]+$/)
export const sbio = y.string().required().max(100).matches(/[\w .?(),]+/)
export const stext = y.string().matches(/[\w .?(),]+/)
export const sobjectId = y.string().required().isObjectId()