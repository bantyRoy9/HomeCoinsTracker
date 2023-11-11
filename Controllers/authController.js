const User = require('../Model/UserModels/userSchema');
const crypto = require('crypto')
const AppError = require('./../Utils/appError');
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const catchAsync = require('../Utils/catchAsync');
const Email = require('../Utils/Email');
const SendSMS = require('../Utils/SendSMS');


const signToken = id => {
    return jwt.sign({ id }, process.env.jwt_secret, {
        expiresIn: process.env.jwt_expire
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const tokenOptions = {
        expires: new Date(Date.now() + process.env.jwt_cookie_expire * 24 * 60 * 60 * 1000),
        // secure:true,
        httpOnly: true
    }
    // if(provess.env.NODE_ENV ==='production') cookieOptions.secure = true 
    res.cookie('jwt', token, tokenOptions)
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
};

exports.sendCreateUserOtp = catchAsync(async(req,res,next)=>{
    const user = await User.find({email:req.body.email});
    if(user.length) return next(new AppError('User already existed!',406));
    const newUser = await User.create(req.body);
    let URL = `${req.protocol}://${req.get('host')}/me`;
    const verifyUserOtp = newUser.createVerifyUserOtp();
    await newUser.save({ validateBeforeSave: false })
   // await new Email(newUser, URL).sendWelcome();
    await new Email(newUser, verifyUserOtp).sendOTPEmail('Verify User Email (OTP)','activate your HomeCoinsTracker Account, please verify your email address. Your account will not be created until your email address is confirmed.');
    res.status(200).json({
        status:true,
        msg:'OTP has sended to your registed email address.',
        data:{}
    });
});

exports.createrUser = catchAsync(async (req, res, next) => {
    const OTP = req.params.OTP;
    const user = await User.findOne({email:req.body.email,verifyUserOtp:OTP,verifyUserOtpExpire: { $gt: Date.now() }});
    console.log(user);
    if(!user){
        return next(new AppError('OTP has expired or invalid',400));  
    };
    user.verifyUserOtp=undefined;
    user.verifyUserOtpExpire=undefined;
    user.isActive = true;
    await user.save();
    createSendToken(user, 201, res)
})
 
exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password, phone } = req.body;
    console.log(email,password)
    // loging with phone
    if (!Object.keys(req.body).includes('email')) {
        if (!phone || !password) {
            return next(new AppError('Please fill both Mobile no & password ', 401))
        }
        const user = await User.findOne({ phone }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect user Moble or Password', 401))
        }

        createSendToken(user, 200, res);
    } else {

        if (!email || !password) {
            return next(new AppError('Please fill both email & password ', 401))
        };

        const user = await User.findOne({ email }).select('+password').populate('totalEarn totalExpend','amount -_id');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect user email or password', 401))
        }

        createSendToken(user, 200, res);

    }

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
    }
    else if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
        token = req.headers.cookie.split('=')[1];
    }
    if (!token) {
        return next(new AppError('you are not login! please Login', 401))
    }

    const decoder = await promisify(jwt.verify)(token, process.env.jwt_secret);
    // console.log(decoder);

    const currentUser = await User.findById(decoder.id)
    if (!currentUser) {
        return next(new AppError('The user belongs to this Id token is no longer exist', 401))
    }

    // iat is key of decoder object which show time in ms
    if (currentUser.changePasswordAfter(decoder.iat)) {
        return next(new AppError('User recently changed password! please login again!!', 401))
    }
    
    req.user = currentUser
    // send data into pug
    res.locals.user = currentUser;
    // console.log(res.user);
    next();
})


exports.isLoggedIn = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
        token = req.headers.cookie.split('=')[1];
    }
    if (!token) {
        return next(new AppError('you are not login! please Login', 401))
    }
    const decoder = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);
    // console.log(decoder);
    const currentUser = await User.findById(decoder.id)
    if (!currentUser) {
        return next(new AppError('The user belongs to this Id token is no longer exist', 401))
    }
    if (currentUser.changePasswordAfter(decoder.iat)) {
        return next(new AppError('User recently changed password! please login again!!', 401))
    }
    res.user = currentUser
    next();
};

exports.restrictTo = (...role) => {
     //console.log(...role);
    return (req, res, next) => {
          //console.log(req.user.role);
        if (!role.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
    }
};
exports.setUserAndGroupId = (keyName) => async(req,res,next)=>{
    const keyNames = keyName.split(',');
    if(keyNames && keyNames.length>0){
        keyNames.forEach((keyName)=>{
            if(!req.body[keyName]) req.body[keyName] = req.user.id;
        });
    };
    if(!req.user.isGroupIncluded) return next(new AppError('User not exist any group',404));
    req.body['groupId'] = req.user.groupId
    next();
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
    //  console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('User Email is Not Found', 404))
    };
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false })
    try {
        // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
        const resetURL = resetToken
        await new Email(user, resetURL).sendOTPEmail('HomeCoinsTracker account password reset',`Please use this code to reset the password for the HomeCoinsTracker account ${req.body.email.substring(0,4)}**@gmail.com.`);
        //await new SendSMS(user,resetURL).resetPassword();

        res.status(200).json({
            status: 'success',
            message: 'verification code send to your registerd mobile or email!!'
        })
    } catch (err) {
        user.passwordResetToken = undefined,
        user.passwordResetExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new AppError('There was an Error sending the email. Try again later ', 500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpire: { $gt: Date.now() } })
    if (!user) {
        return next(new AppError('Token has Invalid or has expired', 400))
    };
    user.password = req.body.password;
    user.passwordconfirm = req.body.passwordconfirm;
    user.passwordResetExpire = undefined;
    user.passwordResetToken = undefined;
    await user.save();
    createSendToken(user, 200, res);
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

exports.responseSend = async(res,statusCode,status,data,msg)=>{
    res.status(statusCode).json({
        status,length:data?.length??0,msg,data
    });
};