
const app = require('./app');
const dotenv = require('dotenv').config({path: './.env'});
const mongoose = require('mongoose');
let DB = process.env.DB_URL;
if(process.env.NODE_ENV === 'development'){
   DB = process.env.DB_URL_LOCAL;
};
const PORT = process.env.PORT || 8000;
mongoose.connect(DB).then( connection =>{
    console.log('DB Connected');
}).catch( err=>{
    console.log(err);
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`,process.env.NODE_ENV);
});
