const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

exports.findModal = (Modal,queryMap={},listView,populate) => catchAsync(async(req,res,next)=>{
    let data = await Modal.find(queryMap,listView);
    !data && next(new AppError("Record not found",404));
    if(populate) data = data.populate(populate);
    next(responseSend(res,200,true,data,"Record find successfull."));
});

exports.createModal = (Modal,isSetActivity) => catchAsync(async(req,res,next)=>{
    const createRespone = await Modal.create(req.body);
    if(isSetActivity){
        req[`${req.url.replace("/","")}Id`]=createRespone._id;
        next();
    }else{
        next(responseSend(res,201,true,createRespone,"Record created successfull."));
    }
});

exports.updateModal = (Modal,isSetActivity) => catchAsync(async(req,res,next)=>{
    const updatedId=req.body.id;
    const updatedRecord = await Modal.findByIdAndUpdate(updatedId,req.body);
    !updatedRecord && next(new AppError("Expend not found",404));
    if(isSetActivity){
        req[`${req.url.replace("/","")}Id`]=updatedId;
        next();
    }else{
        next(responseSend(res,201,true,{},"Record updated successfull."));
    }
});

exports.deleteModal = (Modal,isSetActivity) => catchAsync(async(req,res,next)=>{
    const deletrdId = req.params.id;
    const deleteResponse = await Modal.findByIdAndDelete(deletrdId);
    !deleteResponse && next(new AppError("Record not found",404));
    if(isSetActivity){
        req[`${req.url.replace("/","")}Id`]=deletrdId;
        next();
    }else{
        next(responseSend(res,200,true,{},"Record deleted successfull."));
    }
});