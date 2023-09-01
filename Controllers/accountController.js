const EarnModel = require("../Model/AccountModels/earnSchema");
const HomeAccSchemaModel = require("../Model/AccountModels/homeAcc");
const User = require("../Model/UserModels/userSchema");
const catchAsync = require("../Utils/catchAsync");


exports.saveDailyEarns = catchAsync(async(req,res,next) => {
    const saveEarn = await EarnModel.create(req.body);
    const earnByuser = await User.findById({_id:req.body.earnBy});
    earnByuser.totalEarn = [...earnByuser.totalEarn, saveEarn._id];
    await earnByuser.save();
    res.status(201).json({
        status:'true',
        saveEarn,
    })
});

exports.totalEarnByUser = catchAsync(async(req,res,next) =>{
    const toatalErn = await EarnModel.find({earnBy:req.user.id});
    if(!toatalErn){
        next(new AppError("Earn not found by this user Id.",500));
    };
    res.status(200).json({
        status:true,
        length: toatalErn.length,
        data:toatalErn
    });
});
exports.getTotalEarns = catchAsync(async(req,res,next) =>{
    const totalErans = await EarnModel.find().populate({path:"earnBy"});
    res.status(200).json({
        status:true,
        length:totalErans.length,
        data:totalErans
    });
});
