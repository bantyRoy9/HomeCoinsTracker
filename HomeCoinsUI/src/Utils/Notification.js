import io from 'socket.io-client';
import { ApiContextURL } from './URLProperties';

class NotificationService {
    constructor() {
        this.socket = io(ApiContextURL);
    }
    initialize() {
        this.socket.on('connection', (socket) => {
            console.log(socket, "connected");
        });
    }
    joinGroup(groupId) {
        this.socket.emit('joinGroup', groupId);
    }
    leaveGroup(groupId) {
        this.socket.emit("leaveGroup", groupId);
    }
    sendMessage(senderId, message, groupId) {
        if (this.socket) {
            this.socket.emit("sendMessage", { senderId, message, groupId });
        };
    }
    newMessage(callback) {
        if (this.socket) {
            this.socket.on('newMessage', (message) => {
                callback(message);
            });
        }
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

const notificationService = new NotificationService();
export default notificationService;
