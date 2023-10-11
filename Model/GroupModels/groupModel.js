const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Group name required']
    },
    members:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    createdDate:{
        type:Date,
        default: new Date()
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
});

module.exports = mongoose.model('Group',groupSchema)