const ActivityModels = require("../Model/ActivityModels/activityModel");
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
    switch(req.url){
        case "/earn":
            reqBody.addEarn=req.earnId
        break;
        case "/expend":
            reqBody.addExpend = req.expendId
        break;
        default:
            break;
    };
    await ActivityModels.create(reqBody);
    responseSend(res,200,true,{},"add successfully");
});

exports.getActivity=catchAsync(async(req,res,next)=>{
    const groupId = req.params.groupId ? {groupId:req.params.groupId} : {};
    let response = await ActivityModels.find(groupId).lean().populate('user','name').populate('addEarn','amount source').populate('addExpend','amount source description');
    response = sortArrayDataByDate(response,'date')
    responseSend(res,200,true,response,"");
});