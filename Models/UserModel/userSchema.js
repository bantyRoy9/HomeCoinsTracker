const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const otpGenerator = require('otp-generator');
const { removeWhiteSpace } = require('../../Utils/commonFunction');
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
        type:mongoose.Schema.ObjectId
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
    isActive:{
        type:Boolean,
        default:'false'
    },
    fcmToken:String,
    passwordChangeAt: Date,
    passwordResetToken:String,
    passwordResetExpire:Date,
    verifyGroupToken:String,
    verifyGroupTokenExpire:Date,
    verifyUserOtp:String,
    verifyUserOtpExpire:Date
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function(next){
    this.userId = `${removeWhiteSpace(this.name,"L")}${Math.trunc((Math.random()+1)*10000)}`
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
const generateOTP = () => otpGenerator.generate(4,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false,digits:true});
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = generateOTP();
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpire = Date.now() + 10*60*1000
    return resetToken
};

userSchema.methods.createVerifyUserOtp = function(){
    const verifyUserOtp = generateOTP();
    this.verifyUserOtp = verifyUserOtp;
    this.verifyUserOtpExpire = Date.now() + 10*60*1000;
    return verifyUserOtp;
};

userSchema.methods.createVerifyToken = function(){
    const verifyToken = crypto.randomBytes(32).toString('hex');
    this.verifyGroupToken = crypto.createHash('sha256').update(verifyToken).digest('hex');
    this.verifyGroupTokenExpire = Date.now() + 24*60*60*1000;
    return verifyToken;
}

const User = mongoose.model('User',userSchema);

module.exports = User;
