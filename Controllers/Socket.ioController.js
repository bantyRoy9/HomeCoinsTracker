const User = require('../Models/UserModel/userSchema');
const ChatModel = require('../Models/ChatModel/ChatModel');
const { responseSend } = require('./authController');
const catchAsync = require('../Utils/catchAsync');
const { sendNotification } = require('../firebase');

exports.joinGroup = catchAsync(async (socket, groupId) => {
    
    socket.join(groupId);
});

exports.sendMessage = catchAsync(async (socket, { groupId, senderId, message }) => {
    const chatMessage = await ChatModel.create({ groupId, senderId, message });
    const notificationPayload = {
        notification: {
            title: `New message from ${senderId}`,
            body: message
        }
    }
    sendNotification("cfTYHXNHSW-JHrx-MWyIQC:APA91bH6HsYlcSJxY8FjiYAuCBflO3M3wHE3Wx--5zti2c_Ctjqu_FqKwOD7ZXlLYuKQHaadMEyGAn3BoDxcR8Qi2RtXlSFw1l3cQraDWPW35thep13dGjM_RgrYyBaPEFIxnXKv3ro_", notificationPayload);
    socket.broadcast.to(groupId).emit("newMessage", chatMessage)
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
})