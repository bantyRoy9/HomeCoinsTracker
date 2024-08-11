
const app = require('./app');
const dotenv = require('dotenv').config({path: './.env'});
const mongoose = require('mongoose');
const { createServer } = require("http");
const initializeSocket = require('./Utils/SocketIO');
const  admin = require('firebase-admin');
let DB = process.env.DB_URL;
if(process.env.NODE_ENV === 'development'){
    DB = process.env.DB_URL_LOCAL;
};

const serviceAccount = require('./firebaseServiceAccountKey.json')//JSON.parse(firebaseServiceAccountKey);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const PORT = process.env.PORT || 8000;
const server = createServer(app);
mongoose.connect(DB).then( connection =>{
    console.log('DB Connected');
}).catch( err=>{
    console.log(err);
});
// Initialize Socket.IO
initializeSocket(server);
server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`,process.env.NODE_ENV);
});
