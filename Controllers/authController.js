const User = require('./../modals/userModal');
const crypto = require('crypto')
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const catchAsync = require('../utils/catchAsync');

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
}

exports.signUp = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordconfirm: req.body.passwordconfirm
    });
    const url = `${req.protocol}://${req.get('host')}/me`;
    // console.log(url);
    await new Email(newUser, url).sendWelcome()
    createSendToken(newUser, 201, res)

})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password, phone } = req.body;

    // loging with phone
    if (!Object.keys(req.body).includes('email')) {
        if (!phone || !password) {
            return next(new AppError('please fill both Mobile no & password ', 401))
        }
        const user = await User.findOne({ phone }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('incorrect user phone or password', 401))
        }

        createSendToken(user, 200, res);
    } else {

        if (!email || !password) {
            return next(new AppError('please fill both email & password ', 401))
        };

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('incorrect user email or password', 401))
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
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
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
    if (req.cookies.jwt) {
        try {
            const decoder = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);
            // console.log(decoder);
            const currentUser = await User.findById(decoder.id)
            if (!currentUser) {
                return next()
            }
            if (currentUser.changePasswordAfter(decoder.iat)) {
                return next()
            }

            res.locals.user = currentUser
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

exports.restrictTo = (...role) => {
    //  console.log(role);
    return (req, res, next) => {
        //  console.log(req.user);
        if (!role.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
    }
}

exports.forgetPassword = catchAsync(async (req, res, next) => {
    //  console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('User Email is Not Found', 404))
    }

    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false })

    try {
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
        await new Email(user, resetURL).restPassword();

        res.status(200).json({
            status: 'success',
            message: 'token send to email!!'
        })
    } catch (err) {
        user.createPasswordResetToken = undefined,
            user.passwordResetExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new AppError('There was an Error sending the email. Try again later ', 500))
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpire: { $gt: Date.now() } })
    // console.log(user);
    if (!user) {
        return next(new AppError('Token has Invalid or has expired', 400))
    }

    user.password = req.body.password
    user.passwordconfirm = req.body.passwordconfirm
    user.passwordResetExpire = undefined,
        user.passwordResetToken = undefined
    await user.save();

    createSendToken(user, 200, res)
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
})