const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
module.exports = class Email{
    constructor(user,url){
        this.to= user.email,
        this.firstName = user.name,
        this.url = user.url,
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
    async send(subject,template){
        const mailOption = {
            from:this.from,
            to:this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }
        await this.newTransport().sendMail(mailOption)
    }
}