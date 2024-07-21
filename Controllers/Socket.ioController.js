const User = require('../Models/UserModel/userSchema');
const ChatModel = require('../Models/ChatModel/ChatModel');
const { responseSend } = require('./authController');
const catchAsync = require('../Utils/catchAsync');
const { sendNotification } = require('../firebase');
const mongoose = require('mongoose');


exports.joinGroup = catchAsync(async (socket, groupId) => {
    socket.join(groupId);
});

exports.sendMessage = catchAsync(async (socket, { groupId, senderId, message }) => {
    let chatMessage = await ChatModel.create({ groupId, senderId, message });
    const users = await User.find({ groupId:new mongoose.Types.ObjectId(groupId) });
    let user = users.filter(el=>el.id == senderId);
    if(user && user.length>0){
        user = user[0]
    };
    chatMessage.senderId = user;
    const tokens = users.flatMap(user => user.fcmtoken);
    console.log(tokens,'tokens')
    const notificationPayload = {
        notification: {
            title: `New message from ${user?.name}`,
            body: message
        }
    };
    tokens.forEach(token => token && sendNotification(token, notificationPayload));
    socket.broadcast.to(groupId).emit("newMessage", chatMessage);
});

exports.getChatMessages = catchAsync(async (req, res) => {
    const { groupId } = req.params;
    const messages = await ChatModel.find({ groupId }).sort({ timestamp: 1 }).populate('senderId');
    responseSend(res, 200, true, messages, "message foun success");
});
exports.handleDisconnect = catchAsync(async (socket) => {
    const user = await User.findOneAndDelete({ socketId: socket.id });
    if (user) {
        console.log(`${user.userId} disconnected from group ${user.groupId}`);
    }
});
exports.leaveGroup = catchAsync(async (socket, groupId) => {
    socket.leave(groupId);
});
// exports.sendNotificationByUsers = catchAsync(async(fmctokens,notification)=>{

// })