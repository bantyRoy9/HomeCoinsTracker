const textflow = require('textflow.js');
textflow.useKey('Tro8xAb0MJM6hmWjIaO7LtMfmNZEZ83JovQAI2oN9v3kKqQL4s4CnG8ICTkcC81o');
module.exports = class SendSMS{
    constructor(user,otp){
        this.mobileNo = user.mobile,
        this.otp = otp
    }
    sendSMS(SMS){
        textflow.sendSMS(`+91${this.mobileNo}`,SMS,(result)=>{
        })
    };
    async resetPassword(){
        const smsTemp = `Your reset verification Code is: ${this.otp}`
        await this.sendSMS(smsTemp)
    }
}