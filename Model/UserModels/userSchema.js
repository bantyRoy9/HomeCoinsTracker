const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const otpGenerator = require('otp-generator')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is requiredd']
    },
    userId:String,
    photo:{
        type:String,
        default:'default.png'
    },
    isGroupIncluded:{
        type:Boolean,
        default:false
    },
    groupId:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Email is requiredd'],
        validate:[validator.isEmail, 'Provide Valide Email']
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:[true,'Password is requiredd'],
        minlength:4,
        select:false
    },
    confirmPassword:{
        type:String,
        validate:{
            validator : function(el){
                return (el === this.password)
            },
            message:'Confirm Password Not Match!'
        }
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    totalExpend:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Expend'
    }],
    totalEarn:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Earn'
    }],
    passwordChangeAt: Date,
    passwordResetToken:String,
    passwordResetExpire:Date
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function(next){
    this.userId = `${this.name}${Math.trunc((Math.random()+1)*10000)}`
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined;
    next();
});
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
};
userSchema.methods.changePasswordAfter = function(JWTTimeStamp){
    if(this.passwordChangeAt){
        const changeTimeStamp = parseInt(this.passwordChangeAt.getTime()/1000,10)
        return JWTTimeStamp < changeTimeStamp
    }
    return false;
};
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = otpGenerator.generate(4,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false,digits:true});
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpire = Date.now() + 10*60*1000
    return resetToken
}

const User = mongoose.model('User',userSchema);

module.exports = User;
