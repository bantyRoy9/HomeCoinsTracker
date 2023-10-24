const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
const sendGridMail = require('@sendgrid/mail');
module.exports = class Email{
    constructor(user,msg){
        this.to= [user.email],
        this.firstName = user.name,
        this.msg = msg,
        this.from = {
            name:'HomeCoinsTracker',
            email:process.env.EMAIL_FROM
        }
    }

    newTransport(){
        return nodemailer.createTransport({
            service:'SendGrid',
            host:'smtp.gmail.com',
            port: 465,
            secure: false,
      auth:{
        user: process.env.SENDGRID_USERNAMR,
        pass: process.env.SENDGRID_PASSWORD,
      }
        })
    }
    async send(subject,text){
        const mailOption = {
            from:this.from,
            to:this.to,
            subject,
            text
        };
        console.log(mailOption);
        await sendGridMail.setApiKey(process.env.SENDGRID_PASSWORD);
        const mailRes = await sendGridMail.send(mailOption);
        console.log(mailRes);
        return mailRes
    }

    async resetPassword(){  
        await this.send('your reset otp valid for (10min)',this.msg)
    }
    async sendRequestMail(){
        await this.send('Memember Add Request',this.msg)
    }
}