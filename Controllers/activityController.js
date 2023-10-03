const ActivityModels = require("../Model/ActivityModels/activityModel");
const catchAsync = require("../Utils/catchAsync");

exports.usersActivity = catchAsync(async(req,res,next)=>{
    let user = req.user;
    let response = await ActivityModels.create({user,date:new Date(),});
    if(response){
        next();
    };
})