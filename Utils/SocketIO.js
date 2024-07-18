const { Server } = require('socket.io');
const notificationController = require('../Controllers/Socket.ioController');

const initializeSocket = (server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        console.log('user connected:', socket.id);
        socket.on('joinGroup', (groupId) => notificationController.joinGroup(socket, groupId));
        socket.on('leaveGroup',(groupId)=> notificationController.leaveGroup(socket,groupId));
        socket.on('sendMessage', (newMsg) => notificationController.sendMessage(socket, newMsg));
        socket.on('disconnect', () => notificationController.handleDisconnect(socket));
    });
    return io;
};

module.exports = initializeSocket;
