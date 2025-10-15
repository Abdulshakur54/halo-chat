import nodemailer from 'nodemailer'
import "dotenv/config"
const gmailUser = process.env.GMAIL_USER
const appPassword = process.env.GMAIL_APP_PASSWORD

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailUser,
        pass: appPassword
    }
})


export const sendEmail = async (from, to, subject, html, attachments = []) => { //attachment is an array of object. each object has a href and filename property
    try {
        await transporter.sendMail({
            from: `${from} <${gmailUser}>`,
            to, subject, html, attachments
        })
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export const generateResetPasswordHtml = (companyName, recipientName, resetLink) => {
    return `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Email Message</title>
            </head>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f7fa;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding:40px 0;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td style="background:#4A90E2; padding:20px; text-align:center;">
                        <img src="https://res.cloudinary.com/maschat/image/upload/v1757905182/logo_njyzys.png" alt="Hallo Chat" width="180" style="display:block; margin:0 auto;" />
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:16px; line-height:1.6;">
                        <h2 style="margin-top:0; color:#4A90E2;">Reset your password</h2>
                        <p>Hi ${recipientName},</p>
                        <p>
                            We receive a message to reset your password.
                        </p>
                        <p>
                            Click on the reset link below or copy and paste it in your browser
                        </p>
                        <div style="text-align:center; margin:30px 0;">
                            <a href="${resetLink}" target="_blank">
                            ${resetLink}
                            </a>
                        </div>
                        <p>
                            If you didn’t expect this email, you can safely ignore it.
                        </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#888888;">
                        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
                        </td>
                    </tr>
                    
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>
`
}


export const generateResetPasswordSuccessHtml = (companyName, recipientName) => {
    return `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Email Message</title>
            </head>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f7fa;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding:40px 0;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td style="background:#4A90E2; padding:20px; text-align:center;">
                        <img src="https://res.cloudinary.com/maschat/image/upload/v1757905182/logo_njyzys.png" alt="Hallo Chat" width="180" style="display:block; margin:0 auto;" />
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:16px; line-height:1.6;">
                        <h2 style="margin-top:0; color:#4A90E2;">Notification of password change</h2>
                        <p>Hi ${recipientName},</p>
                        <p>
                            We want to notify you that your password has been changed
                        </p>
                      
                        
                        <p>
                            Have a great day!
                        </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#888888;">
                        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
                        </td>
                    </tr>
                    
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>
`
}

export const generateContactMessageHtml = (companyName, recipientName) => {
    return `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Email Message</title>
            </head>
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f7fa;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding:40px 0;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td style="background:#4A90E2; padding:20px; text-align:center;">
                        <img src="https://res.cloudinary.com/maschat/image/upload/v1757905182/logo_njyzys.png" alt="Hallo Chat" width="180" style="display:block; margin:0 auto;" />
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding:30px; color:#333333; font-size:16px; line-height:1.6;">
                        <h2 style="margin-top:0; color:#4A90E2;">Message Received</h2>
                        <p>Hi ${recipientName},</p>
                        <p>
                            We received your message. We will get back to you soon.
                        </p>
                        <p>
                           Best Regards
                        </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#888888;">
                        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
                        </td>
                    </tr>
                    
                    </table>
                </td>
                </tr>
            </table>
            </body>
            </html>
`
}

// sendEmail('Hallo Chat', 'muhammedabdulshakur@gmail.com', 'Test Email', '<h1>Test Email</h1>', 'Test Email Text', attachments=[{href: 'https://site.com/logo.png', filename: 'logo.png'}])