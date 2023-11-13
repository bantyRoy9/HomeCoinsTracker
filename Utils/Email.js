const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const pug = require('pug');
module.exports = class Email {
    constructor(user, msg) {
        this.to = user.email,
        this.firstName = user.name,
        this.msg = msg,
        this.from = `HomeCoinsTracker <${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_APP_PASSWORD,
            }
        })
        /*   if (process.env.NODE_DEV == "production") {
        } else {
            return nodemailer.createTransport({
                service: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            })
         }*/
    };
    async send(template,subject,messageToUser) {
        let html = pug.renderFile(`${__dirname}/Templates/Email/${template}.pug`,{
            firstName:this.firstName,
            msg:this.msg,
            messageToUser,
            subject
        })
        const mailOption = {
            to: this.to,
            from: this.from,
            subject,
            html,
            text:htmlToText.htmlToText(html)
        };
        try {
            await this.newTransport().sendMail(mailOption);
        } catch (err) {
            return err
        }
    }
    async sendWelcome() {
        await this.send('welcome','Welcome to homeCoinsTracker')
    }

    async sendRequestMail() {
        await this.send('verifyUser','Verify user Add Request', this.msg);
    };
    async sendUrlEmail(subject,message){
        await this.send('sendURL',subject,message)
    }
    async sendOTPEmail(subject,message){
        await this.send('sendOTP',subject,message)
    }
}