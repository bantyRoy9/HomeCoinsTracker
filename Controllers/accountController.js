const EarnModel = require("../Model/AccountModels/earnSchema");
const ExpendModel = require("../Model/AccountModels/expendSchema");
const { graphData } = require("../Utils/commonFunction");
const catchAsync = require("../Utils/catchAsync");
const ApiFeature = require("../Utils/apiFeature");
const moment = require('moment');
const AppError = require("../Utils/appError");
const { updateModal, createModal,deleteModal, findModal } = require("./commonController");


exports.saveDailyEarnExpend=(type)=>createModal(type === "earn" ? EarnModel : ExpendModel,true);
exports.updateDailyEarnExpend=(type)=>updateModal(type === "earn" ? EarnModel : ExpendModel,true);
exports.deletrDailyEarnExpend=(type)=>deleteModal(type === "earn" ? EarnModel : ExpendModel,true);
exports.getDailyEarnExpend=(type)=>findModal(type === "earn" ? EarnModel : ExpendModel);



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
   if(dateRange && dateRange.split('_') && dateRange.split('_').length){
        req.query.date={
            gte: moment(new Date(dateRange.split('_')[0])),
            lte: moment(new Date(dateRange.split('_')[1])),
        };
        delete req.query.dateRange;
   }; 
   next();
});
exports.getTotalEarns = catchAsync(async(req,res,next) =>{
    const groupFilter = req.query.groupId ? {groupId:req.query.groupId}:{};
    const filterData = new ApiFeature(EarnModel,req.query).filter();
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
    const groupFilter = req.query.groupId ? {groupId:req.query.groupId}:{};
    const filterData = new ApiFeature(ExpendModel,req.query).filter();
    const totalExpend = await filterData.modal;
   let graphDataJson = null;
   if(req.query.type === "both" && req.query.isGraph === "true"){
       if(req.totalErans){ 
           graphDataJson = graphData([req.totalErans,totalExpend],['Earn','Expend'],['#5aa16d','#a15a76']);
       }else{
           graphDataJson = graphData([totalExpend],['Expend'],['#5aa16d']);
       }
   }else{
        if(req.totalErans){
            graphDataJson=[...req?.totalErans,...totalExpend]
        }else{
            graphDataJson=totalExpend
        }
    };

    res.status(200).json({
        status:true,
        graphData:graphDataJson,
        length:totalExpend.length,
        data:totalExpend
    });
});

exports.deleteDailyEarns = catchAsync(async(req,res,next)=>{
    const params = req.params.id;
    const response = await EarnModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:true,
        msg:'delete successfull',
        data:null
    })
})
