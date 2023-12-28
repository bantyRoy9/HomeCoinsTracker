const catchAsync = require('../Utils/catchAsync');
const User = require("../Model/UserModels/userSchema");
const { responseSend } = require('./authController');
const { usersListBO } = require('../Utils/responseJSON');

exports.getUserDetails = catchAsync(async(req,res,next)=>{
        const user = await User.findOne({_id:req.user.id}).populate('totalEarn totalExpend','amount -_id');
        res.status(200).json({
            status:true,
            msg:'user find successfull',
            data: user
        })

    });
exports.getLoginUserDetails = catchAsync(async(req,res,next)=>{
    res.status(200).json({
        status:true,
        data:req?.user
    })
});

exports.getUsers = catchAsync(async(req,res,next)=>{
    const response = await User.find({},'name email mobile role photo');
    responseSend(res,200,true,response,'');
});

exports.getUserLists = catchAsync(async(req,res,next)=>{
    const users = await User.find({groupId:req.user.groupId},'name');
    responseSend(res,200,true,users,"");
})
