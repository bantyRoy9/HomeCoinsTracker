const catchAsync = require('../Utils/catchAsync');
const User = require("../Models/UserModel/userSchema");
const { responseSend } = require('./authController');
const { usersListBO } = require('../Utils/responseJSON');
const { getDateRange } = require('../Utils/commonFunction');
const ExpendModel = require('../Models/AccountModel/expendSchema');
const EarnModel = require('../Models/AccountModel/earnSchema');
const mongoose = require('mongoose');

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
        data: req.user
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
    let { period, userid } = req.params;
    let { _id } = req.user;
    if (userid) {
        _id = userid;
    }

    const { startDate, endDate } = getDateRange(period);

    const expenseAggregation = ExpendModel.aggregate([
        {
            $match: {
                expendBy: new mongoose.Types.ObjectId(_id),
                date: { $gte: new Date(startDate), $lte: new Date(endDate) }
            }
        },
        {
            $lookup: {
                from: 'expendtypes',
                localField: 'expendType',
                foreignField: '_id',
                as: 'expendTypeDetails'
            }
        },
        {
            $unwind: '$expendTypeDetails'
        },
        {
            $facet: {
                totalExpenses: [
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" },
                            averageAmount: { $avg: "$amount" }
                        }
                    }
                ],
                expensesByType: [
                    {
                        $group: {
                            _id: "$expendTypeDetails",
                            totalAmount: { $sum: "$amount" }
                        }
                    }
                ],
                recentTopExpenses: [
                    {
                        $sort: { date: -1 }
                    },
                    { $limit: 4 },
                    {
                        $lookup: {
                            from: 'expendtypes',
                            localField: 'expendType',
                            foreignField: '_id',
                            as: 'expendTypeDetails'
                        }
                    },
                    {
                        $unwind: '$expendTypeDetails'
                    }
                ]
            }
        }
    ]);

    const earningAggregation = EarnModel.aggregate([
        {
            $match: {
                earnBy: _id,
                date: { $gte: new Date(startDate), $lte: new Date(endDate) }
            }
        },
        {
            $lookup: {
                from: 'sources', // the name of the source collection
                localField: 'source',
                foreignField: '_id',
                as: 'sourceDetails'
            }
        },
        {
            $unwind: '$sourceDetails'
        },
        {
            $facet: {
                totalEarnings: [
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$amount" },
                            averageAmount: { $avg: "$amount" }
                        }
                    }
                ],
                earningsBySource: [
                    {
                        $group: {
                            _id: "$sourceDetails",
                            totalAmount: { $sum: "$amount" }
                        }
                    }
                ],
                recentTopEarnings: [
                    {
                        $sort: { date: -1 }
                    },
                    { $limit: 4 },
                    {
                        $lookup: {
                            from: 'sources',
                            localField: 'source',
                            foreignField: '_id',
                            as: 'sourceDetails'
                        }
                    },
                    {
                        $unwind: '$sourceDetails'
                    }
                ]
            }
        }
    ]);

    const [expensesResult, earningsResult] = await Promise.all([expenseAggregation, earningAggregation]);

    const totalExpend = expensesResult[0]?.totalExpenses[0]?.totalAmount || 0;
    const totalEarn = earningsResult[0]?.totalEarnings[0]?.totalAmount || 0;
    const avgExpend = expensesResult[0]?.totalExpenses[0]?.averageAmount || 0;
    const avgEarn = earningsResult[0]?.totalEarnings[0]?.averageAmount || 0;
    const expensesByType = expensesResult[0]?.expensesByType || [];
    const earningsBySource = earningsResult[0]?.earningsBySource || [];
    const recentTopExpenses = expensesResult[0]?.recentTopExpenses || [];
    const recentTopEarnings = earningsResult[0]?.recentTopEarnings || [];

    res.status(200).json({
        status: 'success',
        data: {
            period,
            totalExpend,
            totalEarn,
            avgExpend,
            avgEarn,
            expensesByType,
            earningsBySource,
            recentTopExpenses,
            recentTopEarnings
        }
    });
});