const  admin = require('firebase-admin');
const serviceAccount = require('./Utils/firebaseServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.sendNotification = (token, message) => {
    console.log(token,message);
    return admin.messaging().sendToDevice(token, message,);
};
