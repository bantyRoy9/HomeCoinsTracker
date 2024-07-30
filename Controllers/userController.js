const catchAsync = require('../Utils/catchAsync');
const User = require("../Models/UserModel/userSchema");
const { responseSend } = require('./authController');
const { usersListBO } = require('../Utils/responseJSON');
const { getDateRange } = require('../Utils/commonFunction');
const ExpendModel = require('../Models/AccountModel/expendSchema');
const EarnModel = require('../Models/AccountModel/earnSchema');

exports.getUserDetails = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id }).populate('totalEarn totalExpend', 'amount -_id');
    res.status(200).json({
        status: true,
        msg: 'user find successfull',
        data: user
    })

});
exports.getLoginUserDetails = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: true,
        data: req?.user
    })
});

exports.getUsers = catchAsync(async (req, res, next) => {
    const response = await User.find({}, 'name email mobile role photo');
    responseSend(res, 200, true, response, '');
});

exports.getUserLists = catchAsync(async (req, res, next) => {
    const users = await User.find({ groupId: req.user.groupId }, 'name');
    responseSend(res, 200, true, users, "");
})
exports.userReport = catchAsync(async (req, res, next) => {
    const { period } = req.params, { _id } = req.user;
    const { startDate, endDate } = getDateRange(period);
    const expenses = await ExpendModel.find({expendBy: _id,date: { $gte: startDate, $lte: endDate }});
    const earnings = await EarnModel.find({earnBy:_id,date: { $gte: startDate, $lte: endDate }});
    const totalExpend = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const totalEarn = earnings.reduce((acc, earn) => acc + earn.amount, 0);

    res.status(200).json({
        status: 'success',
        data: {
            period,
            totalExpend,
            totalEarn,
            expenses,
            earnings
        }
    });
})