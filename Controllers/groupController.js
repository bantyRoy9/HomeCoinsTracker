const GroupModels = require("../Model/GroupModels/groupModel");
const crypto = require('crypto');
const User = require("../Model/UserModels/userSchema");
const Email = require("../Utils/Email");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const { responseSend } = require("./authController");

exports.createGroup = catchAsync(async (req, res, next) => {
    let reqBody = {
        name: req.body.name,
        members: { member: req.user.id },
        createdBy: req.user.id
    };
    if (req.user.isGroupIncluded) return next(new AppError('Not Allow!, User exist in any othe group', 406));

    const response = await GroupModels.create(reqBody);
    req.user.isGroupIncluded = true;
    req.user.groupId = response._id;
    await req.user.save();
    responseSend(res, 201, true, response, 'Group created successfully.')
});
exports.getGroupList = catchAsync(async (req, res, next) => {
    const groupList = await GroupModels.find({}).populate('createdBy');
    responseSend(res, 200, true, groupList, '');
});
exports.addMemberRequest = catchAsync(async (req, res, next) => {
    if (req.body && (req.body.email || req.body.mobile) && !req.user.isGroupIncluded) {
        const addMemberUser = await User.findOne({ email: req.body.email });
        if (!addMemberUser) return next(new AppError('User not registered to HomecoinsTracker', 400));

        if (req.user.email == req.body.email) return next(new AppError("Not Allow!, User cann't add it self Try another email", 400));
        if (!addMemberUser.isGroupIncluded) return next(new AppError('User Not Found Any Group', 401));

        const group = await GroupModels.findOne({ _id: addMemberUser.groupId });
        let member = group.members.filter(el => el.member == addMemberUser._id);
        if (member && member.length && menubar[0].role !== 'admin') return next(new AppError('Given User have not access to add memeber'), 406);

        const verifyToken = req.user.createVerifyToken();
        await req.user.save({ validateBeforeSave: false });
        const verifyURL = `${req.protocol}://${req.get('host')}/api/v1/groupController/verifyUser/${verifyToken},${addMemberUser.groupId},${req.user.id}`;

        await new Email(addMemberUser, verifyURL).sendUrlEmail('Send User Add Request','');
        responseSend(res, 200, true,{},"Request sended to group admin");
    } else {
        return next(new AppError('User already exist in another group', 406));
    };
});

exports.verifyGroupToken = catchAsync(async (req, res, next) => {
    const verifyToken = req.params.verifyToken.split(',');
    if (!verifyToken && !verifyToken.length) return next(new AppError('Verification Token not found', 400));

    const resetToken = crypto.createHash('sha256').update(verifyToken[0]).digest('hex');
    const user = await User.findOne({ verifyGroupToken: resetToken, verifyGroupTokenExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new AppError('Token has Invalid or has expired', 400))
    };
    user.verifyGroupToken = null;
    user.verifyGroupTokenExpire = null;
    await user.save();
    req.verifyToken = verifyToken;
    next();
});
exports.addMembers = catchAsync(async (req, res, next) => {
    const verifyToken = req.verifyToken;
    const group = await GroupModels.findById(verifyToken[1]);
    if (!group) return next(new AppError('Group not found', 404))
    if (group.members.includes(verifyToken[2])) return next(new AppError('User already exist in this group', 403));
    group.members.push({ member: verifyToken[2], role: 'user' });
    await group.save();
    await User.findByIdAndUpdate(verifyToken[2],{isGroupIncluded:true,groupId:verifyToken[1]});
    responseSend(res, 200, true, {}, 'User added successfully.');
});

exports.getGroupMember=catchAsync(async(req,res,next)=>{
    const groupId = req.params.groupId;
    if(!groupId) return next(new AppError('GroupId invalid',400));
    const data = await User.find({groupId},'name email mobile role userId photo groupId');
    responseSend(res,200,true,data,"user find successfull");
})