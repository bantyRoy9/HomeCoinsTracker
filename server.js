const app = require('express')();
const dotenv = require('dotenv').config({path: './config.env'});
const mongoose = require('mongoose');
const DB = process.env.DB_URL;
const PORT = process.env.PORT;

mongoose.connect(DB).then( connection =>{
    console.log('DB Connected');
}).catch( err=>{
    console.log(err);
})
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})