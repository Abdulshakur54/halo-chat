import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === 'Bearer') {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (payload) {
            const user = await User.findById(payload.userId).select("-password")
            if (user) {
                req.user = user
                next()
            } else {
                res.status(404).json({ success: false, message: "User not found" })
            }

        } else {
            res.status(400).json({ success: false, message: "Invalid Token" })
        }
    } else {
        res.status(400).json({ success: false, message: "Authorization token required" })
    }
}