const groupModel = require("../Model/GroupModels/groupModel");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

exports.createGroup = catchAsync(async(req,res,next)=>{
    const response = await groupModel.create(req.body);
    next(responseSend(res,201,true,response,'Group created successfully.'))
})