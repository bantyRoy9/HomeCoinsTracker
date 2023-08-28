const SourceModal = require("../Model/Account_Schema/sourceSchema");
const catchAsync = require("../Utils/catchAsync");

exports.getSource = catchAsync(async(req,res,next)=>{
    const allSource = await SourceModal.find();
    res.status(200).json({
        status:true,
        msg:'Get all source successfully',
        data:allSource
    });
});

exports.createSource = catchAsync(async(req,res,next)=>{
    await SourceModal.create(req.body);

})