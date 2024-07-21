const moment = require("moment");
const ActivityModels = require("../Models/ActivityModel/activityModel");
const catchAsync = require("../Utils/catchAsync");
const { sortArrayDataByDate } = require("../Utils/commonFunction");
const { responseSend } = require("./authController");
const User = require("../Models/UserModel/userSchema");
const { default: mongoose } = require("mongoose");
const { sendNotification } = require("../firebase");

exports.addUsersActivity = catchAsync(async(req,res,next)=>{
    let reqBody = {
        user:req.user.id,
        methodType:req.method,
        Url:req.url,
        groupId:req.body.groupId
    };
    let msg="added",filterKey="addEarn",amount='';
    switch(req.url){
        case "/earn":
            reqBody.addEarn=req.earnId
            amount = req.earnAmount;
        break;
        case "/expend":
            reqBody.addExpend = req.expendId;
            filterKey="addExpend";
            amount = req.expendAmount;
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
    const users = await User.find({ groupId:new mongoose.Types.ObjectId(req.body.groupId) });
    let user = users.filter(el=>el.id == req.user.id);
    if(user && user.length>0){
        user = user[0]
    };
    const tokens = users.flatMap(user => user.fcmtoken);
    const notificationPayload = {
        notification: {
            title: `${user?.name} ${msg}`,
            body: `${amount}`
        }
    };
    console.log(tokens,notificationPayload,"notificationActivity")
    tokens.forEach(token => token && sendNotification(token, notificationPayload)); 
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