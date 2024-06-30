import io from 'socket.io-client';
import { ApiContextURL } from './URLProperties';

class NotificationService {
    constructor() {
        this.socket = null;
    }

    initialize(userId, groupId) {
        this.socket = io(ApiContextURL);
        this.socket.emit('joinGroup', { userId, groupId });
    }

    sendNotification(groupId, message) {
        if (this.socket) {
            this.socket.emit('sendNotification', { groupId, message });
        }
    }

    onNotification(callback) {
        if (this.socket) {
            this.socket.on('receiveNotification', (message) => {
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
