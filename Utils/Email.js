const nodemailer = require('nodemailer')
const htmlToText = require('html-to-text')
const sendGridMail = require('@sendgrid/mail');

module.exports = class Email {
    constructor(user, msg) {
        this.to = user.email,
        this.firstName = user.name,
        this.msg = msg,
        this.from = process.env.EMAIL_FROM
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
    async send(subject, text) {
        const mailOption = {
            to: this.to,
            from: this.from,
            subject,
            text
        };
        console.log(mailOption,'mailOption');
        try {
            const response = await this.newTransport().sendMail(mailOption);
            return response
        } catch (err) {
            return err
        }
    }
    async sendWelcome() {
        const mailResponse = await this.send('Welcome to homeCoinTracker')
        return mailResponse;
    }

    async resetPassword() {
        const mailResponse = await this.send('your reset otp valid for (10min)', this.msg)
        return mailResponse;
    }
    async sendRequestMail() {
        const mailResponse = await this.send('Verify user Add Request', this.msg);
        return mailResponse
    };
    async sendUserVerifyOTP(){
        const mailResponse = await this.send('One Time Password',this.msg);
    };
}