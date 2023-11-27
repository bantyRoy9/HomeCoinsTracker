const { sourceModel } = require("../Model/SourceModels");
const catchAsync = require("../Utils/catchAsync");

exports.getSource = catchAsync(async(req,res,next)=>{
    // const allSource = await sourceModel.find({},'sourceName').lean().populate("createdBy",'name email');
    const allSource = await sourceModel.find({},'sourceName');

    res.status(200).json({
        status:true,
        msg:'Get all source successfully',
        data:allSource
    });
});

exports.createSource = catchAsync(async(req,res,next)=>{
    await sourceModel.create(req.body);
    res.status(201).json({
        status:true,
        msg:"Source created successfully",
        data:null
    });
})