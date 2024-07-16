const  admin = require('firebase-admin');

exports.sendNotification = (token, message) => {
    return admin.messaging().sendToDevice(token, message,);
};
