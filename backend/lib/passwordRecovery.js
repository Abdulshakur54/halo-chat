import { Schema, model } from "mongoose";
import { object, ValidationError } from "yup"
import val from "./functions.js"
import { generateResetPasswordHtml, generateResetPasswordSuccessHtml, sendEmail } from "./brevo.js"
import crypto from "crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";


const users = process.env.PASSWORD_RECOVERY_USER_COLLECTION
const companyName = process.env.PASSWORD_RECOVERY_COMPANY_NAME
const expiryMinutes = parseInt(process.env.PASSWORD_RECOVERY_EXPIRY_TIME || "15", 10); // default to 15 if not set
const expiresOn = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString();
const frontendURL = process.env.PASSWORD_RECOVERY_FRONTEND_URL

const passwordRecoverySchema = new Schema({
    email: { type: String, required: true },
    hashedToken: { type: String, required: true },
    expiresOn: { type: Date, required: true },
}, { timestamps: true })

const PasswordRecovery = model('PasswordRecovery', passwordRecoverySchema)


const requestReset = async (req, res) => {
    try {
        let { email } = req.body
        const rawData = object({ email: val('email') })
        const data = await rawData.validate({ email })
        //check if email exist from the given user collection
        let result = await model(users).findOne({ email: data.email })
        if (result) {
            //generate a token and hash it
            const token = crypto.randomBytes(32).toString("hex");
            const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
            // delete any existing resetRecord for this email
            await PasswordRecovery.deleteMany({ email: data.email })
            await PasswordRecovery.create({ email: data.email, hashedToken, expiresOn }) // save hashed token to the collection
            const name = result?.firstName || result?.fullName || result?.name
            const resetLink = `${frontendURL}/reset-password/${token}`;
            const htmlMessage = generateResetPasswordHtml(companyName, name, resetLink)
            if (await sendEmail(companyName, data.email, 'Reset Your Password', htmlMessage)) {
                res.status(200).json({ success: true, message: 'A reset link has been sent to your email if your account is found' })
            } else {
                res.status(500).json({ success: false, message: "Unable to send Email to reset password" })
            }

        }

    } catch (e) {
        console.log(e)
        if (e instanceof ValidationError) {
            res.status(400).json({ success: false, message: e.errors })
        } else {
            res.status(500).json({ success: false, message: e.message })
        }
    }


}



const resetPassword = async (req, res) => {
    try {
        let { password, token} = req.body
        const rawData = object({ password: val('password') })
        const data = await rawData.validate({ password })
        password = data.password
        // Hash token to compare with DB
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const tokenValid = await PasswordRecovery.findOne({
            hashedToken
        });

        if (!tokenValid) {
            return res.status(400).json({ success: false, message: "Invalid Token" })
        } else {
            if (Date.now() > new Date(tokenValid.expiresOn).getTime()) return res.status(400).json({ success: false, message: `Expired Token | now: ${Date.now()}, tokenExpiry: ${new Date(tokenValid.expiresOn).getTime()} ` })
        }
        const email = tokenValid.email

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        await model(users).updateOne({ email }, { $set: { password: hashedPassword } })
        //delete the reset token record
        await PasswordRecovery.deleteMany({ email })
        //get the name of the user from the provided user table
        let result = await model(users).findOne({ email })
        const name = result?.firstName || result?.fullName || result?.name
        const htmlMessage = generateResetPasswordSuccessHtml(companyName, name)
        await sendEmail(companyName, email, 'Password Reset Notification', htmlMessage)
        res.status(200).json({ success: true, message: "Password successfully reset" })
    } catch (e) {
        console.log(e)
        if (e instanceof ValidationError) {
            res.status(400).json({ success: false, message: e.errors })
        } else {
            res.status(500).json({ success: false, message: e.message })
        }
    }

}

const router = Router()

router.post('/reset-password', resetPassword)
router.post('/request-reset', requestReset)

export { router as passwordRecoveryRouter }

