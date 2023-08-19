const catchAsync = require('../Utils/catchAsync');
const User = require("../Model/User_Schema/userSchema")

exports.getUserDetails = catchAsync(async(req,res,next)=>{
        const user = await User.findOne({_id:req.user.id}).populate({path:'totalEarn'});
        res.status(200).json({
            status:true,
            msg:'user find successfull',
            data: user
        })

    });
