const { Server } = require('socket.io');
const notificationController = require('../Controllers/Socket.ioController');

const initializeSocket = (server) => {
    const io = new Server(server,{
        cors: {
            origin: "http://localhost:8081"
        }});
    console.log('working',"");
    io.on('connection', (socket) => {
        console.log('user connected:', socket.id);

        // socket.on('joinGroup', (data) => notificationController.joinGroup(socket, data));
        socket.on('sendNotification', (data) => notificationController.sendNotification(io, data));
        socket.on('disconnect', () => notificationController.handleDisconnect(socket));
    });

    return io;
};

module.exports = initializeSocket;
