import io from 'socket.io-client';
import { ApiContextURL } from './URLProperties';

class NotificationService {
    constructor() {
        this.socket = io(ApiContextURL,{
            transports: ['websocket', 'polling'], // Use websocket and fallback to polling if necessary
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
            autoConnect: true
        });
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
                console.log(message,"message");
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
