const GroupModels = require("../Model/GroupModels/groupModel");
const crypto = require('crypto');
const User = require("../Model/UserModels/userSchema");
const Email = require("../Utils/Email");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

exports.createGroup = catchAsync(async(req,res,next)=>{
    let reqBody = {
        name:req.body.name,
        members:{member:req.user.id},
        createdBy:req.user.id
    };
    if(req.user.isGroupIncluded) return next(new AppError('Not Allow!, User exist in any othe group',406));
    
    const response = await GroupModels.create(reqBody);
    req.user.isGroupIncluded =true;
    req.user.groupId = response._id;
    await req.user.save();
    return next(responseSend(res,201,true,response,'Group created successfully.'))
});
exports.getGroupList = catchAsync(async(req,res,next)=>{
    const groupList = await GroupModels.find({}).populate('createdBy');
    return next(responseSend(res,200,true,groupList,''))
});
exports.addMemberRequest = catchAsync(async(req,res,next)=>{
    if(req.body && (req.body.email||req.body.mobile) && !req.user.isGroupIncluded){
        const addMemberUser = await User.findOne({email:req.body.email});
        if(!addMemberUser) return next(new AppError('User not registered to HomecoinsTracker',400));

        if(req.user.email == req.body.email) return next(new AppError("Not Allow!, User cann't add it self Try another email",400));
        if(!addMemberUser.isGroupIncluded) return next(new AppError('User Not Found Any Group',401));

        const group = await GroupModels.findOne({_id:addMemberUser.groupId});
        let member = group.members.filter(el=>el.member == addMemberUser._id);
        if(member && member.length && menubar[0].role !== 'admin') return next(new AppError('Given User have not access to add memeber'),406);

        const verifyToken = req.user.createVerifyToken();
        await req.user.save({ validateBeforeSave:false });

        const verifyURL = `${req.protocol}://${req.get('host')}/api/v1/groupController/verifyUser/${verifyToken},${addMemberUser.groupId},${req.user.id}`
        console.log(verifyURL);
        //const email = await new Email(req.user, verifyURL).sendRequestMail();
        return responseSend(res,200,true,verifyURL);
    }else{
        return next( new AppError('User already exist in another group',406));
    };
});

exports.verifyGroupToken = catchAsync(async(req,res,next)=>{
    const verifyToken = req.params.verifyToken.split(',');
    if(!verifyToken && !verifyToken.length)  return next(new AppError('Verification Token not found',400));

   const resetToken = crypto.createHash('sha256').update(verifyToken[0]).digest('hex');

   const user = await User.findOne({verifyGroupToken: resetToken, verifyGroupTokenExpire: { $gt: Date.now() }});

   if(!user){
    return next(new AppError('Token has Invalid or has expired', 400))
   };
   user.verifyGroupToken=null;
   user.verifyGroupTokenExpire=null;
   await user.save();
   req.verifyToken = verifyToken;
   next();
});
exports.addMembers = catchAsync(async(req,res,next)=>{
    console.log(req.verifyToken);
    const verifyToken = req.verifyToken;
    
    const group = await GroupModels.findById(verifyToken[1]);
    if(!group) return next(new AppError('Group not found',404))
    if(group.members.includes(verifyToken[2])) return next(new AppError('User already exist in this group',403));
    group.members.push({member:verifyToken[2],role:'user'});
    await group.save();
    responseSend(res,200,true,{},'User added successfully.');
})