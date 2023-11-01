const ActivityModels = require("../Model/ActivityModels/activityModel");
const catchAsync = require("../Utils/catchAsync");
const { sortArrayDataByDate } = require("../Utils/commonFunction");
const { responseSend } = require("./authController");

exports.addUsersActivity = async(req,idType,addId,date)=>{
    let reqBody = {
        user:req.user.id,
        methodType:req.method,
        Url:req.url,
        groupId:req.body.groupId
    };
    if(date){reqBody.date=date}
    switch(idType){
        case "addEarn":
            reqBody.addEarn=addId
        break;
        case "addExpend":
            reqBody.addExpend = addId
        break;
        default:
            break;
    };
    await ActivityModels.create(reqBody);
};

exports.getActivity=catchAsync(async(req,res,next)=>{
    const groupId = req.params.groupId ? {groupId:req.params.groupId} : {};
    let response = await ActivityModels.find(groupId).lean().populate('user','name').populate('addEarn','amount source').populate('addExpend','amount source description');
    response = sortArrayDataByDate(response,'date')
    responseSend(res,200,true,response,"");
});