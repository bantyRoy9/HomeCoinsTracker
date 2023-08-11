const express = require('express');
const app = express();
const router = express.Router();
const dotenv = require('dotenv').config({path: './config.env'});
const mongoose = require('mongoose');
const DB = process.env.DB_URL;
const PORT = process.env.PORT;

mongoose.connect(DB).then( connection =>{
    console.log('DB Connected');
}).catch( err=>{
    console.log(err);
})

const aa = router.get('/test',(req,res,next)=>{
    console.log('work');
    res.send('connecte')
})
app.use('/api',aa)
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})