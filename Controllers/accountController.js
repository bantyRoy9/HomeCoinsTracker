const EarnModel = require("../Model/Account_Schema/earnSchema");
const HomeAccSchemaModel = require("../Model/Account_Schema/homeAcc");
const User = require("../Model/User_Schema/userSchema");
const catchAsync = require("../Utils/catchAsync");

exports.getUserIds = async(req,res,next)=>{
    if(!req.body.earnBy) req.body.earnBy = req.user.id;
    next();
};
exports.saveDailyEarns = async(req,res,next) => {
    try{
        const saveEarn = await EarnModel.create(req.body);
        const earnByuser = await User.findById({_id:req.body.earnBy});
        earnByuser.totalEarn = [...earnByuser.totalEarn, saveEarn._id];
        await earnByuser.save();
        res.status(200).json({
            status:'true',
            saveEarn,
        })
    }catch(err){
        console.log(err);
    }
}