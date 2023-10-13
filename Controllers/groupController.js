const GroupModels = require("../Model/GroupModels/groupModel");
const User = require("../Model/UserModels/userSchema");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

exports.createGroup = catchAsync(async(req,res,next)=>{
    let reqBody = {
        name:req.body.name,
        members:{member:req.user.id}
    };
    const response = await GroupModels.create(reqBody);
    return next(responseSend(res,201,true,response,'Group created successfully.'))
});
exports.getGroupList = catchAsync(async(req,res,next)=>{
    const groupList = await GroupModels.find({});
    return next(responseSend(res,200,true,groupList,''))
})
exports.addMembers = catchAsync(async(req,res,next)=>{
    let user={};
    if(req.body && (req.body.email||req.body.mobile)){
        user = await User.findOne(req.body);
        if(!user){
           return next(new AppError('user not found',401))
        }
    };
    const group = await GroupModels.findById(req.params.id);
    if(!group) return next(new AppError('Group not found',404))
    if(group.members.includes(user.id)) return next(new AppError('User already exist in this group',403));
    group.members.push({member:user.id,role:'user'});
    await group.save();
    responseSend(res,200,true,group,'user added successfully.')
})