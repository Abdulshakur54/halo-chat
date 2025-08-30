import y from 'yup'
import { ValidationError } from 'yup'
import User from '../models/User.js'
import { sbio, sfullName } from '../lib/validator.js'
import { cloudinary } from '../lib/cloudinary.js'




export const updateUser = async (req, res) => {
    const { bio, fullName, profilePic } = req.body
    const schema = y.object({
        bio: sbio, fullName: sfullName
    })
    try {
        const valData = await schema.validate({ bio, fullName })
        {
            const { bio, fullName } = valData
            const uploadRes = await cloudinary.uploader.upload(profilePic)
            const { secure_url, public_id } = uploadRes
            const user = await User.findByIdAndUpdate(req.user._id, { bio, fullName, profilePic: secure_url, profilePicId: public_id }, { new: true })
            res.status(200).json({ success: true, message: "Profile successfully updated", data: { user } })
        }
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).json({ success: false, message: e.errors })
        } else {
            res.status(500).json({ success: false, message: e.message })
        }
    }
}

export const getUser = (req, res) => {
    res.status(200).json({ success: true, data: { user: req.user } })
}