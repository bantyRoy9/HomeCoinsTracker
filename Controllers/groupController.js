const GroupModels = require("../Model/GroupModels/groupModel");
const User = require("../Model/UserModels/userSchema");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

exports.createGroup = catchAsync(async(req,res,next)=>{
    const response = await GroupModels.create(req.body);
    next(responseSend(res,201,true,response,'Group created successfully.'))
});

exports.addMembers = catchAsync(async(req,res,next)=>{
    let user = await User.findById(req.user.id);
    if(user.role !== 'admin'){
        next(AppError('Permission Denied!',403))
    };
    if(req.body && (req.body.email||req.body.mobile)){
        user = await User.findOne(req.body);
        if(!user){
            next(AppError('user not found',404))
        }
    };
    const group = await gr
})