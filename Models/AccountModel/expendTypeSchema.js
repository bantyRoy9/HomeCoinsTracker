const mongoose = require('mongoose');

const expendTypeSchema = new mongoose.Schema({
    expendName:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    source:{
        type:mongoose.Schema.ObjectId,
        ref:"Source"
    },
    expendType:{
        type:String,
        unique:true
    },
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    }
},{
    timestamps:true
});

const expendType = mongoose.model('expendType',expendTypeSchema);

module.exports=expendType;