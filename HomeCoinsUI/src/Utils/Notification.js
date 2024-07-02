import io from 'socket.io-client';
import { ApiContextURL } from './URLProperties';

class NotificationService {
    constructor() {
        this.socket = io(ApiContextURL);
    }

    initialize(userId, groupId) {
        this.socket.on('connection', (socket)=>{
            console.log(socket,"connected");
        });
    }

    sendNotification(groupId, message) {
        if (this.socket) {
            this.socket.emit('sendNotification', { groupId, message });
        }
    }

    onNotification(callback) {
        
            this.socket.on('receiveNotification', (message) => {
                console.log(message,"message");
                callback(message);
            });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

const notificationService = new NotificationService();
export default notificationService;
