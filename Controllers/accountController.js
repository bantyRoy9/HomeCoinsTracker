const EarnModel = require("../Models/AccountModel/earnSchema");
const ExpendModel = require("../Models/AccountModel/expendSchema");
const { graphData, getDateRange, picGraphData } = require("../Utils/commonFunction");
const catchAsync = require("../Utils/catchAsync");
const ApiFeature = require("../Utils/apiFeature");
const moment = require('moment');
const AppError = require("../Utils/appError");
const { updateModal, createModal, deleteModal, findModal } = require("./commonController");
const { default: mongoose } = require("mongoose");
const { responseSend } = require("./authController");


exports.saveDailyEarnExpend = (type) => createModal(type === "earn" ? EarnModel : ExpendModel, true);
exports.updateDailyEarnExpend = (type) => updateModal(type === "earn" ? EarnModel : ExpendModel, true);
exports.deletrDailyEarnExpend = (type) => deleteModal(type === "earn" ? EarnModel : ExpendModel, true);
exports.getDailyEarnExpend = (type) => findMoeteModal(type === "earn" ? EarnModel : ExpendModel, true);
exports.getDailyEarnExpend = (type) => findModal(type === "earn" ? EarnModel : ExpendModel);



exports.totalEarnByUser = catchAsync(async (req, res, next) => {
    const toatalErn = await EarnModel.find({ earnBy: req.user.id });
    if (!toatalErn) {
        next(new AppError("Earn not found by this user Id.", 500));
    };
    res.status(200).json({
        status: true,
        length: toatalErn.length,
        data: toatalErn
    });
});

exports.getQuery = catchAsync(async (req, res, next) => {
    let { dateRange } = req.query;
    if (dateRange && dateRange.split('_') && dateRange.split('_').length) {
        req.query.date = {
            gte: moment(new Date(dateRange.split('_')[0])),
            lte: moment(new Date(dateRange.split('_')[1])),
        };
        delete req.query.dateRange;
    };
    req.query.groupId = req.user.groupId;
    next();
});
exports.getTotalEarns = catchAsync(async (req, res, next) => {
    const groupFilter = req.query.groupId ? { groupId: req.query.groupId } : {};

    const filterData = new ApiFeature(EarnModel, req.query).filter();
    const totalErans = await filterData.modal
    if (req.query?.type == 'both') {
        req.totalErans = totalErans;
        next();
    } else {
        let graphDataJson = graphData([totalErans], ['Earn'], ['#5aa16d']);
        res.status(200).json({
            status: true,
            graphData: graphDataJson,
            length: totalErans.length,
            data: totalErans
        });
    }
});

exports.getTotalExpend = catchAsync(async (req, res, next) => {
    const groupFilter = req.query.groupId ? { groupId: req.query.groupId } : {};
    const filterData = new ApiFeature(ExpendModel, req.query).filter();
    const totalExpend = await filterData.modal;
    let graphDataJson = null;
    if (req.query.type === "both" && req.query.isGraph === "true") {
        if (req.totalErans) {
            graphDataJson = graphData([req.totalErans, totalExpend], ['Earn', 'Expend'], ['#5aa16d', '#a15a76']);
        } else {
            graphDataJson = graphData([totalExpend], ['Expend'], ['#5aa16d']);
        }
    } else {
        if (req.totalErans) {
            graphDataJson = [...req?.totalErans, ...totalExpend]
        } else {
            graphDataJson = totalExpend
        }
    };

    res.status(200).json({
        status: true,
        graphData: graphDataJson,
        length: totalExpend.length,
        data: totalExpend
    });
});

exports.deleteDailyEarns = catchAsync(async (req, res, next) => {
    const params = req.params.id;
    const response = await EarnModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: true,
        msg: 'delete successfull',
        data: null
    });
});

exports.getAnalysisData = catchAsync(async (req, res, next) => {
    const { groupId, date, source, earnBy, expendBy, expendType,recentlimit } = req.query;
    const match = {groupId}, extraQueryEarn = {}, extraQueryExpend = {};
    if(date){
        match['date']={ $gte: new Date(date.gte), $lte: new Date(date.lte) }
    }
    if (source) {
        extraQueryEarn.source = new mongoose.Types.ObjectId(source)
    };
    if (earnBy) {
        extraQueryEarn.earnBy = new mongoose.Types.ObjectId(earnBy);
    }
    if (expendBy) {
        extraQueryExpend.expendBy = new mongoose.Types.ObjectId(expendBy);
    }
    if (expendType) {
        extraQueryExpend.expendType = new mongoose.Types.ObjectId(expendType);
    }
    let earningAggregation = expendAggegation = [],limit = !date ? null  : recentlimit ? parseInt(recentlimit) : 4;
    if(!Object.keys(extraQueryExpend).length){
    earningAggregation = await EarnModel.aggregate([
        {
            $match: { ...match, ...extraQueryEarn }
        }, {
            $lookup: {
                from: 'sources',
                foreignField: '_id',
                localField: 'source',
                as: 'sourceType'
            }
        }, {
            $lookup: {
                from: 'users',
                foreignField: '_id',
                localField: 'earnBy',
                as: 'earnBy'
            }
        }, {
            $unwind: '$sourceType'
        }, {
            $unwind: '$earnBy'
        }, {
            $facet: {
                totalearn: [{
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$amount" }
                    }
                }],
                earnBySources: [
                    {
                        $group: {
                            _id: {
                                id: "$sourceType._id",
                                sourceType: "$sourceType.sourceType",
                                sourceName: "$sourceType.sourceName",
                                sourceInv: "$sourceType.sourceInv",
                            },
                            totalAmount: { $sum: "$amount" }
                        }
                    }
                ],
                earnByMembers: [
                    {
                        $group: {
                            _id: {
                                id: "$earnBy._id",
                                name: "$earnBy.name",
                                photo: "$earnBy.photo",
                            },
                            totalAmount: { $sum: "$amount" }
                        }
                    }
                ],
                recentearn: [
                    {$sort: { date: -1 }}, 
                    ...(limit !== null ? [{ $limit: limit }] : []),
                    {$project: {
                        _id: 1,
                        amount: 1,
                        date: 1,
                        'earnBy._id': 1,
                        'earnBy.name': 1,
                        'sourceType._id': 1,
                        'sourceType.sourceName': 1
                    }
                }]
            }
        }
    ]);
    };
    if(!Object.keys(extraQueryEarn).length){
    expendAggegation = await ExpendModel.aggregate([
        {
            $match: { ...match, ...extraQueryExpend }
        }, {
            $lookup: {
                from: 'expendtypes',
                foreignField: '_id',
                localField: 'expendType',
                as: 'expendType'
            }
        }, {
            $lookup: {
                from: 'users',
                foreignField: '_id',
                localField: 'expendBy',
                as: 'expendBy'
            }
        }, {
            $unwind: '$expendType'
        }, {
            $unwind: '$expendBy'
        }, {
            $facet: {
                totalexpend: [{
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$amount" }
                    }
                }],
                expendByTypes: [
                    {
                        $group: {
                            _id: {
                                id: "$expendType._id",
                                expendType: "$expendType.expendType",
                                expendName: "$expendType.expendName",
                            },
                            totalAmount: { $sum: "$amount" }
                        }
                    }
                ],
                expendByMembers: [
                    {
                        $group: {
                            _id: {
                                id: "$expendBy._id",
                                name: "$expendBy.name",
                                photo: "$expendBy.photo",
                            },
                            totalAmount: { $sum: "$amount" }
                        }
                    }
                ],
                recentexpend: [
                    {$sort: { date: -1 }},                 
                    ...(limit !== null ? [{ $limit: limit }] : []),
                    {$project: {
                        _id: 1,
                        amount: 1,
                        date: 1,
                        'expendBy._id': 1,
                        'expendBy.name': 1,
                        'expendType._id': 1,
                        'expendType.expendType': 1,
                        'expendType.expendName': 1
                    }
                }]
            }
        }
    ]);
    }
    
    const totalearn = earningAggregation[0]?.totalearn[0]?.totalAmount || 0;
    const earnBySources = earningAggregation[0]?.earnBySources || [];
    const earnByMembers = earningAggregation[0]?.earnByMembers || [];
    const recentearn = earningAggregation[0]?.recentearn || [];

    const totalexpend = expendAggegation[0]?.totalexpend[0]?.totalAmount || 0;
    const expendByTypes = expendAggegation[0]?.expendByTypes || [];
    const expendByMembers = expendAggegation[0]?.expendByMembers || [];
    const recentexpend = expendAggegation[0]?.recentexpend || [];
    let responseData = { earn: { totalearn, earnBySources, earnByMembers, recentearn }, expend: { totalexpend, expendByTypes, expendByMembers, recentexpend } };
    responseData['graphdata'] = picGraphData(responseData);
    responseSend(res, 200, true, responseData);
});
