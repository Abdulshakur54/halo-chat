import val from '../lib/functions.js'
import { generateContactMessageHtml, sendEmail } from '../lib/brevo.js'
import axios from 'axios'
import y, { ValidationError } from 'yup'

const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY

export const contactUs = async (req, res) => {
    const { fullName, email, message, captchaData } = req.body
    const schema = y.object({
        fullName: val('fullname'),
        email: val("email"),
        message: val("text"),
    })
    try {
        const valData = await schema.validate({ fullName, email, message })
        {
            //validate racaptch
            const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaData}`)
            if (!recaptchaResponse.data.success) {
                return res.status(400).json({ success: false, message: "Unable to verify Recaptcha" });
            }
            const { fullName, email, message } = valData
            const htmlMessage = generateContactMessageHtml('E-Likita Health Consultation', fullName)
            if (await sendEmail('E-Likita Health Consultation', email, 'We Received your Message', htmlMessage)) {
                await sendEmail('E-Likita Health Consultation', 'mabdulshakur54@gmail.com', 'Message from E-Likita', message)
                res.status(200).json({ success: true, message: 'Message sent successfully' })
            } else {
                res.status(500).json({ success: false, message: "Unable to send message" })
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