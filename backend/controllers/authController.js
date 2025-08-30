import User from "../models/User.js"
import y, { ValidationError } from 'yup'
import { semail, spassword, sfullName, sbio } from "../lib/validator.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"

export const signUp = async (req, res) => {
    const { email, fullName, password, bio } = req.body
    const schema = y.object({
        email: semail, password: spassword, fullName: sfullName, bio: sbio
    })
    try {
        const valData = await schema.validate({ email, password, fullName, bio })
        {
            const { email, password, fullName, bio } = valData
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await User.findOne({ email })
            if (user) {
                res.status(500).json({ message: "User with this email exist", success: false })
            } else {
                const newUser = await User.create({ email, fullName, password: hashedPassword, bio })
                res.status(200).json({
                    success: true, message: "Account created successfully",
                    data: { email: newUser.email, fullName: newUser.fullName, bio: newUser.bio, createdAt: newUser.createdAt, updatedAt: newUser.updatedAt }
                })
            }
        }


    } catch (e) {
      
        if (e instanceof ValidationError) {
            res.status(400).json({ success: false, message: e.errors })
        } else {
            console.log(e)
            res.status(500).json({ success: false, message: e.message })
        }
    }

}


export const login = async (req, res) => {
    const { email, password } = req.body
    const schema = y.object({
        email: semail,
        password: spassword
    })
    try {
        const valData = await schema.validate({ email, password })
        {
            const { email, password } = valData
            const user = await User.findOne({ email })
            if (await bcrypt.compare(password, user.password)) {
                const token = generateToken(user._id)
                res.status(200).json({ success: true, message: "Login successfully", token })
            }
        }
    } catch (e) {
        if (e instanceof ValidationError) {
            res.status(400).json({ success: false, message: e.errors })
        } else {
            res.status(500).json({ success: false, message: e.message })
        }
    }
}

