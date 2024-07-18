const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group',
        required:true
    },
    senderId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const ChatModel = mongoose.model("ChatModal",ChatSchema);
module.exports = ChatModel;
