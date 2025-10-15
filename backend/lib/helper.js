import { cloudinary } from "./cloudinary.js"
import fs from 'node:fs'
export const uploadFile = async (file) => {
    try {
        const filename = `${file.destination}/${file.filename}`
        const uploadRes = await cloudinary.uploader.upload(filename)
        const { secure_url, public_id } = uploadRes
        //delete profile pic from the uploaded directory
        fs.unlink(filename, (err) => {
            if (err) {
                throw new Error(err)
            }
        })
        return { secure_url, public_id }
    } catch (err) {
        throw new Error(err)
    }
}
