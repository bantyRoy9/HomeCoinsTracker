const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

const setUniqueId = (id) => (req,res,next) =>{
    
};
exports.create = (Modal) => catchAsync(async(req,res,next)=>{
    const createRespone = await Modal.create(req.body);
    req[`${req.url.replace("/","")}Id`]=createRespone._id;
    next();
});

exports.update = (Modal) => catchAsync(async(req,res,next)=>{
    const updatedId=req.body.id;
    const updatedRecord = await Modal.findByIdAndUpdate(updatedId,req.body);
    !updatedRecord && next(new AppError("Expend not found",500));
    req[`${req.url.replace("/","")}Id`]=updatedId;
    next();
});

exports.delete = (Modal) => catchAsync(async(req,res,next)=>{
    const deleteResponse = await Modal.findByIdAndDelete(req.params.id);
    next(responseSend(res,200,true,{},"Record deleted successfull."));
});