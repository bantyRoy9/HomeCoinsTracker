const User = require('../Models/UserModel/userSchema');
const crypto = require('crypto')
const AppError = require('./../Utils/appError');
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../Utils/catchAsync');
const Email = require('../Utils/Email');
const SendSMS = require('../Utils/SendSMS');
const { removeWhiteSpace, requiredResponseBody } = require('../Utils/commonFunction');
const { userBO } = require('../Utils/responseJSON');

const generateOTP = catchAsync(async(userModal,res,data) =>{
    const verifyUserOtp = userModal.createVerifyUserOtp();
    await userModal.save({ validateBeforeSave: false });
    await new Email(userModal, verifyUserOtp).sendOTPEmail('Verify User Email (OTP)','Activate your HomeCoinsTracker Account, please verify your email address. Your account will not be created until your email address is confirmed.');
    this.responseSend(res,201,true,userModal?._doc,"OTP sended to your registed email.",userBO);
});
const signToken = id => {
    return jwt.sign({ id }, process.env.jwt_secret, {expiresIn: process.env.jwt_expire});
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const tokenOptions = {
        expires: new Date(Date.now() + process.env.jwt_cookie_expire * 24 * 60 * 60 * 1000),
        // secure:true,
        httpOnly: true
    };
    // if(provess.env.NODE_ENV ==='production') cookieOptions.secure = true 
    res.cookie('jwt', token, tokenOptions)
    user.password = undefined;
    this.responseSend(res,statusCode,true,user._doc,"User verified",userBO,token)
};

exports.createUser = catchAsync(async(req,res,next)=>{
    req.body['email'] = removeWhiteSpace(req.body.email,'L');
    const user = await User.find({email:req.body.email});
    if(user.length) return next(new AppError('User already exists!',409));
    const newUser = await User.create(req.body);
    generateOTP(newUser,res);
});

exports.verifyCreatedUserOTP = catchAsync(async (req, res, next) => {
    const OTP = req.params.OTP;
    const user = await User.findOne({email:req.body.email,verifyUserOtp:OTP,verifyUserOtpExpire: { $gt: Date.now() }});
    if(!user){
        return next(new AppError('OTP has expired or invalid',400));  
    };
    user.verifyUserOtp=undefined;
    user.verifyUserOtpExpire=undefined;
    user.isActive = true;
    await user.save();
    createSendToken(user, 200, res);
});
 
exports.loginUser = catchAsync(async (req, res, next) => {
    let { email, password, mobile } = req.body;
    email = removeWhiteSpace(email,'L');
    if (!Object.keys(req.body).includes('email')) {
        if (!mobile || !password) {
            return next(new AppError('Please fill both Mobile no & password ', 401));
        };
        const user = await User.findOne({ mobile },'name email isActive isGroupIncluded role userId mobile fcmtoken').select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect user Moble or Password', 401));
        };
        createSendToken(user, 200, res);
    } else {
        if (!email || !password) {
            return next(new AppError('Please fill both email & password ', 401));
        };
        const user = await User.findOne({ email },'name email isActive isGroupIncluded role userId mobile totalEarn totalExpend groupId fcmtoken').select('+password').populate('totalEarn totalExpend','amount -_id');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect user email or password', 401));
        };
        createSendToken(user, 200, res);
    };
});

exports.logout = async (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }else if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
        token = req.headers.cookie.split('=')[1];
    };
    if (!token) {
        return next(new AppError('you are not login! please Login', 403));
    };
    
    const decoder = await promisify(jwt.verify)(token, process.env.jwt_secret);
    const currentUser = await User.findById(decoder.id);
    if (!currentUser) {
        return next(new AppError('The user belongs to this email is no longer exist', 403));
    };
    // iat is key of decoder object which show time in ms
    if (currentUser.changePasswordAfter(decoder.iat)) {
        return next(new AppError('User recently changed password! please login again!!', 403));
    };
    req.user = currentUser;
    // send data into pug
    //res.locals.user = currentUser;
    next();
});


exports.isLoggedIn = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }else if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
        token = req.headers.cookie.split('=')[1];
    };
    if (!token) {
        return next(new AppError('you are not login! please Login', 403));
    };
    const decoder = await promisify(jwt.verify)(token, process.env.jwt_secret);
    const currentUser = await User.findById(decoder.id);
    if (!currentUser) {
        return next(new AppError('The user belongs to this Id token is no longer exist', 403));
    };
    if (currentUser.changePasswordAfter(decoder.iat)) {
        return next(new AppError('User recently changed password! please login again!!', 403));
    };
    req.user = currentUser;
    next();
};

exports.restrictTo = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        };
        next();
    };
};

exports.setUserAndGroupId = (keyName) => async(req,res,next)=>{
    const keyNames = keyName.split(',');
    if(keyNames && keyNames.length>0){
        keyNames.forEach((keyName)=>{
            if(!req.body[keyName]) req.body[keyName] = req.user._id;
        });
    };
    
    if(!req.user.isGroupIncluded) return next(new AppError('User not exist in any group',404));
    req.body['groupId'] = req.user.groupId;
    next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('Email not exists, try another email.', 404));
    };
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    try {
        // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
        const resetURL = resetToken
        await new Email(user, resetURL).sendOTPEmail('HomeCoinsTracker account password reset',`Please use this code to reset the password for the HomeCoinsTracker account ${req.body.email.substring(0,4)}**@gmail.com.`);
        //await new SendSMS(user,resetURL).resetPassword();
        this.responseSend(res,200,true,"","verification code send to your registerd mobile or email!!");
    } catch (err) {
        user.passwordResetToken = undefined,
        user.passwordResetExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an Error sending the email. Try again later ', 500))
    };
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpire: { $gt: Date.now() } })
    if (!user) {
        return next(new AppError('Token has Invalid or has expired', 400))
    };
    if(!Object.keys(req.body).length){
        return this.responseSend(res,200,true,"","OTP verification successful.")
    };
    // if (await user.correctPassword(req.body.password, user.password)) {
    //     return next(new AppError("New password and current password should not same. try again",400))
    // }
    user.password = req.body.password;
    user.passwordconfirm = req.body.passwordconfirm;
    user.passwordResetExpire = undefined;
    user.passwordResetToken = undefined;
    await user.save();
    this.responseSend(res,200,true,{},"Password update successfully");
})

exports.updatePassword = catchAsync(async (req, res, next) => {
    if (!req.user) return next(new AppError('you are not logged in', 404));

    const user = await User.findById(req.user.id).select('+password');

    if (!await user.correctPassword(req.body.passwordCurrent, user.password)) {
        return next(new AppError('your current password is wrong', 401));
    }
    user.password = req.body.password;
    user.passwordconfirm = req.body.passwordconfirm;
    await user.save();

    createSendToken(user, 200, res);
});

exports.sendOTP = catchAsync(async(req,res,next)=>{
    if(new Date(req.user?.verifyUserOtpExpire).setHours(0,0,0) > Date.now()){
        return next(new AppError('OTP Already sended. Please check your registed email',400))
    };
    generateOTP(req.user,res);
});

exports.responseSend = async(res,statusCode,status,data,msg,DTO,token)=>{
    if(DTO && DTO.length){data = await requiredResponseBody(data,DTO)};
    if(token){data = {user:data}}
     res.status(statusCode).json({
        status,length:data?.length??0,msg,data,token
    });
};

exports.setFcmToken = catchAsync(async(req,res,next)=>{
    let reqParam = req.user._id,{token} = req.params;
    if(!token) return next(new AppError("fcm token not found",403));
    console.log(token,reqParam);
    const user = await User.findById(reqParam);
    if(!user) return next(new AppError("Record not updated"));
    if (!user.fcmTokens.includes(fcmToken)) {
        user.fcmTokens.push(fcmToken);
        await user.save();
    }
    this.responseSend(res,200,true,{},"fcm token updated");
});
exports.removeFcmToken = catchAsync(async(req, res) => {
    let reqParam = req.user._id;
    const user = await User.findById(reqParam);
    if (!user) return next(new AppError("Record not updated"));
    user.fcmTokens = user.fcmTokens.filter(token => token !== fcmToken);
    await user.save();
    this.responseSend(res,200,true,{},"fcm token removed");
})