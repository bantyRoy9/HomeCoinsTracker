const mongoose = require('mongoose');

const expendTypeSchema = new mongoose.Schema({
    name:{
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
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    }
},{
    timestamps:true
});

const expendType = mongoose.model('expendType',expendTypeSchema);

module.exports=expendType;