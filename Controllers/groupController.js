const GroupModels = require("../Model/GroupModels/groupModel");
const User = require("../Model/UserModels/userSchema");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

exports.createGroup = catchAsync(async(req,res,next)=>{
    const response = await GroupModels.create(req.body);
    next(responseSend(res,201,true,response,'Group created successfully.'))
});
exports.getGroupList = catchAsync(async(req,res,next)=>{
    const groupList = await GroupModels.find({});
    next(responseSend(res,200,true,groupList,''))
})
exports.addMembers = catchAsync(async(req,res,next)=>{
    let user = await User.findById(req.user.id);
    if(user.role !== 'admin'){
        next(new AppError('Permission Denied!',403))
    };
    if(req.body && (req.body.email||req.body.mobile)){
        user = await User.findOne(req.body);
        if(!user){
            next(new AppError('user not found',401))
        }
    };
    const group = await GroupModels.findByIdAndUpdate(
        req.params.id,{ 
            $push: { members: user.id }
        },
        { new: true }
    );
    responseSend(res,200,true,group,'user added successfully.')
})