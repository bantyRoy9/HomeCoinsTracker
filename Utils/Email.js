const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
module.exports = class Email{
    constructor(user,otp){
        this.to= user.email,
        this.firstName = user.name,
        this.otp = user.otp,
        this.from = `HomeCoinsTracker <${process.env.EMAIL_FROM}`
    }

    newTransport(){
        return nodemailer.createTransport({
            service:'SendGrid',
            auth:{
                user:process.env.SENDGRID_USERNAMR,
                pass:process.env.SENDGRID_PASSWORD
            }
        })
    }
    async send(subject){
        
        const mailOption = {
            from:this.from,
            to:this.to,
            subject,
            OTP:this.otp
        }
        await this.newTransport().sendMail(mailOption)
    }

    async resetPassword(){
        await this.send('your reset otp valid for (10min)')
    }
}