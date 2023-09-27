const catchAsync = require('../Utils/catchAsync');
const User = require("../Model/UserModels/userSchema")

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
})
