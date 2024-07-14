const moment = require("moment");
const ActivityModels = require("../Models/ActivityModel/activityModel");
const catchAsync = require("../Utils/catchAsync");
const { sortArrayDataByDate } = require("../Utils/commonFunction");
const { responseSend } = require("./authController");

exports.addUsersActivity = catchAsync(async(req,res,next)=>{
    let reqBody = {
        user:req.user.id,
        methodType:req.method,
        Url:req.url,
        groupId:req.body.groupId
    };
    let msg="added",filterKey="addEarn"
    switch(req.url){
        case "/earn":
            reqBody.addEarn=req.earnId
        break;
        case "/expend":
            reqBody.addExpend = req.expendId;
            filterKey="addExpend"
        break;
        default:
            break;
    };
    switch(req.method){
        case "PATCH" :
            const updatedRes = await ActivityModels.findOneAndUpdate({[filterKey]:reqBody[filterKey]},reqBody);
            msg="updated";
            break;
        case "DELETE" :
            await ActivityModels.findOneAndDelete({[filterKey]:reqBody[filterKey]});
            msg="Deleted"
            break;
        default:
            await ActivityModels.create(reqBody);
            break;
    }
    
    next(responseSend(res,200,true,reqBody,`Amount ${msg} successful.`));
});

// exports.getActivity=catchAsync(async(req,res,next)=>{
//     const groupId = req.params.groupId ? {groupId:req.params.groupId} : {};
//     let response = await ActivityModels.find(groupId).lean().populate('user','name').populate('addEarn','amount source').populate('addExpend','amount source description');
//     response = sortArrayDataByDate(response,'date')
//     responseSend(res,200,true,response,"");
// });
exports.getActivity = catchAsync(async (req, res, next) => {
    const groupId = req.params.groupId ? { groupId: req.params.groupId } : {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let response = await ActivityModels.find(groupId)
        .lean()
        .populate('user', 'name')
        .populate('addEarn', 'amount source')
        .populate('addExpend', 'amount source description')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    
    response = sortArrayDataByDate(response, 'date');
    const totalItems = await ActivityModels.countDocuments(groupId);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
        success: true,
        data: response,
        page,
        totalPages,
        totalItems,
    });
});