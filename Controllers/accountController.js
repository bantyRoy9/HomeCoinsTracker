const EarnModel = require("../Model/AccountModels/earnSchema");
const ExpendModel = require("../Model/AccountModels/expendSchema");
const HomeAccSchemaModel = require("../Model/AccountModels/homeAcc");
const User = require("../Model/UserModels/userSchema");
const { graphData } = require("../Utils/commonFunction");
const catchAsync = require("../Utils/catchAsync");
const ApiFeature = require("../Utils/apiFeature");
const moment = require('moment')
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

exports.getQuery= catchAsync(async(req,res,next)=>{
    let { dateRange } = req.query;
    console.log(dateRange);
   if(dateRange && dateRange.split('_') && dateRange.split('_').length){
        req.query.date={
            gte: moment(new Date(dateRange.split('_')[0])),
            lte: moment(new Date(dateRange.split('_')[1])),
        };
        delete req.query.dateRange;
   }; 
   next()
});
exports.getTotalEarns = catchAsync(async(req,res,next) =>{
    const filterData = new ApiFeature(EarnModel.find({}),req.query).filter();
    const totalErans = await filterData.modal
    if(req.query?.type == 'both'){
        req.totalErans = totalErans;
        next();
    }else{
    let graphDataJson= graphData([totalErans],['Earn'],['#5aa16d']);
    res.status(200).json({
        status:true,
        graphData:graphDataJson,
        length:totalErans.length,
        data:totalErans
    });
}
});

exports.getTotalExpend = catchAsync(async(req,res,next)=>{
    const filterData = new ApiFeature(ExpendModel.find({}),req.query).filter();
    const totalExpend = await filterData.modal;
   let graphDataJson = null;
    if(req.totalErans){
        graphDataJson = graphData([req.totalErans,totalExpend],['Earn','Expend'],['#5aa16d','#a15a76']);
    }else{
        graphDataJson = graphData([totalExpend],['Expend'],['#5aa16d']);
    }
    res.status(200).json({
        status:true,
        graphData:graphDataJson,
        length:totalExpend.length,
        data:totalExpend
    });
})

