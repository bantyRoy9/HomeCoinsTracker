const User = require('../Model/UserModels/userSchema');

const joinGroup = async (socket, { userId, groupId }) => {
    try {
        const user = new ({ userId, groupId });
        await user.save();

        socket.join(groupId);
        console.log(`${userId} joined group ${groupId}`);
    } catch (error) {
        console.error('Error joining group:', error);
    }
};

const sendNotification = async (io, { groupId, message }) => {
    try {
        io.to(groupId).emit('receiveNotification', message);
        console.log(`Notification sent to group ${groupId}: ${message}`);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

const handleDisconnect = async (socket) => {
    try {
        const user = await User.findOneAndDelete({ socketId: socket.id });
        if (user) {
            console.log(`${user.userId} disconnected from group ${user.groupId}`);
        }
    } catch (error) {
        console.error('Error on disconnect:', error);
    }
};

module.exports = {
    joinGroup,
    sendNotification,
    handleDisconnect,
};
