const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
    sourceName:{
        type:String
    },
    sorceType:String,
    sourceEarn:{
        type:Array
    },
    sourceInv:Number
})
