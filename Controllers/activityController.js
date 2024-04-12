const moment = require("moment");
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
            reqBody["updatedDate"]=new Date(Date.now);
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
    
    responseSend(res,200,true,{},`Amount ${msg} successful.`);
});

exports.getActivity=catchAsync(async(req,res,next)=>{
    const groupId = req.params.groupId ? {groupId:req.params.groupId} : {};
    let response = await ActivityModels.find(groupId).lean().populate('user','name').populate('addEarn','amount source').populate('addExpend','amount source description');
    response = sortArrayDataByDate(response,'date')
    responseSend(res,200,true,response,"");
});