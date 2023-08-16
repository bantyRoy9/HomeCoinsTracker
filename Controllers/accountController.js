const EarnModel = require("../Model/Account_Schema/earnSchema");
const HomeAccSchemaModel = require("../Model/Account_Schema/homeAcc");
const catchAsync = require("../Utils/catchAsync");

exports.getUserDetails = async(req,res,next)=>{
    if(!req.body.earnBy) req.body.earnBy = req.user.id;
    next();
};
exports.saveDailyEarns = async(req,res,next) => {
    try{
        const saveEarn = await EarnModel.create(req.body);
        res.status(200).json({
            status:'true',
            saveEarn
        })
    }catch(err){
        console.log(err);
    }
}