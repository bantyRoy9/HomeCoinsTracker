const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
module.exports = class Email{
    constructor(user,otp){
        this.to= user.email,
        this.firstName = user.name,
        this.otp = otp,
        this.from = `HomeCoinsTracker <${process.env.EMAIL_FROM}>`
    }

    newTransport(){
        return nodemailer.createTransport({
            host:'gmail',
            port: 465,
            secure: true,
      auth:{
        user: 'mr.bantikumar9716@gmail.com',
        pass:'banti@9716'
      }
        })
    }
    async send(subject){
        
        const mailOption = {
            from:this.from,
            to:this.to,
            subject,
           // text:this.otp
        };
        console.log(mailOption);
        await transporter.verify();
        await this.newTransport().sendMail(mailOption)
    }

    async resetPassword(){
        await this.send('your reset otp valid for (10min)')
    }
}