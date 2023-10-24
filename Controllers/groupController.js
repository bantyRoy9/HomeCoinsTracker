const GroupModels = require("../Model/GroupModels/groupModel");
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
    if(req.user.isGroupIncluded) return next(new AppError('Not Allow!, User exist in any othe group',406))
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
    let user={};
    if(req.body && (req.body.email||req.body.mobile) && !req.user.isGroupIncluded){
        user = await User.findOne(req.body);
        if(!user) return next(new AppError('User not found',401));
        if(!user.isGroupIncluded) return next(new AppError('User Not Found Any Group',401));
        const group = await GroupModels.findOne({_id:user.groupId});
        let member = group.members.filter(el=>el.member == user._id);
        if(member && member.length && menubar[0].role !== 'admin') return next(new AppError('Given User have not access to add memeber'),406);
        const email = await new Email(user, 'testEmail').sendRequestMail();
        console.log(email,'email');
        responseSend(res,200,true,email);
    }else{
        next();
    };
});
exports.addMembers = catchAsync(async(req,res,next)=>{
    let user={};
    if(req.body && (req.body.email||req.body.mobile)){
        user = await User.findOne(req.body);
        if(!user){
           return next(new AppError('user not found',401))
        }
    };
    const group = await GroupModels.findById(req.params.id);
    if(!group) return next(new AppError('Group not found',404))
    if(group.members.includes(user.id)) return next(new AppError('User already exist in this group',403));
    group.members.push({member:user.id,role:'user'});
    await group.save();
    responseSend(res,200,true,group,'user added successfully.')
})