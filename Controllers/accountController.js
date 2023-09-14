const EarnModel = require("../Model/AccountModels/earnSchema");
const ExpendModel = require("../Model/AccountModels/expendSchema");
const HomeAccSchemaModel = require("../Model/AccountModels/homeAcc");
const User = require("../Model/UserModels/userSchema");
const { graphData } = require("../Utils/appFeature");
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

exports.saveDailyExped = catchAsync(async(req,res,next)=>{
    const saveExpend = await ExpendModel.create(req.body);
    const expendByuser = await User.findById({_id:req.body.expendBy});
    expendByuser.totalExpend = [...expendByuser.totalExpend, saveExpend._id];
    await expendByuser.save();
    res.status(201).json({
        status:'true',
        saveExpend,
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
    const totalErans = await EarnModel.find().populate("earnBy","_id, name");
    if(req.query?.type == 'both'){
        req.totalErans = totalErans;
        next();
    }else{
    let graphDataJson= graphData([totalErans],['Earn']);
    res.status(200).json({
        status:true,
        graphData:graphDataJson,
        length:totalErans.length,
        data:totalErans
    });
}
});

exports.getTotalExpend = catchAsync(async(req,res,next)=>{
    const totalExpend = await ExpendModel.find().populate("expendBy","_id, name");
    let graphDataJson = null;
    if(req.totalErans){
        graphDataJson = graphData([req.totalErans,totalExpend],['Earn','Expend']);
    }else{
        graphDataJson = graphData([totalExpend],['Expend']);
    }
    res.status(200).json({
        status:true,
        graphData:graphDataJson,
        length:totalExpend.length,
        data:totalExpend
    });
})

