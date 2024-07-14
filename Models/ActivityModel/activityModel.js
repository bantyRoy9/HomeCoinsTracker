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
        default:Date.now
    },
    Url:String,
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    }
},{
    timestamps:true
});

const ActivityModels = new mongoose.model('ActivityModel',activityModel);

module.exports = ActivityModels;