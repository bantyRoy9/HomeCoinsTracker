const User = require('../Models/UserModel/userSchema');
const ChatModel = require('../Models/ChatModel/ChatModel');
const { responseSend } = require('./authController');
const catchAsync = require('../Utils/catchAsync');
const { sendNotification } = require('../firebase');
const { default: mongoose } = require('mongoose');



exports.joinGroup = catchAsync(async (socket, groupId) => {
    socket.join(groupId);
});

exports.sendMessage = catchAsync(async (socket, { groupId, senderId, message }) => {
    const chatMessage = await ChatModel.create({ groupId, senderId, message });
    const users = await User.find({ groupId:mongoose.Types.ObjectId(groupId) });
    console.log(users);
    const tokens = users.flatMap(user => user.fcmtoken);

    const notificationPayload = {
        notification: {
            title: `New message from ${senderId}`,
            body: message
        }
    };
    console.log(tokens);
    tokens.forEach(token => sendNotification(token, notificationPayload));
    socket.broadcast.to(groupId).emit("newMessage", chatMessage);
});

exports.getChatMessages = catchAsync(async (req, res) => {
    const { groupId } = req.params;
    const messages = await ChatModel.find({ groupId }).sort({ timestamp: 1 });
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