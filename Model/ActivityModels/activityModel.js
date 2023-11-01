const mongoose = require('mongoose');

const activityModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    isRead:Boolean,
    addEarn:{
        type:mongoose.Schema.ObjectId,
        ref:"Earn"
    },
    addExpend:{
        type:mongoose.Schema.ObjectId,
        ref:"Expend"
    },
    methodType:String,
    date:{
        type:Date,
        default:new Date()
    },
    Url:String,
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    }
});

const ActivityModels = new mongoose.model('ActivityModel',activityModel);

module.exports = ActivityModels;