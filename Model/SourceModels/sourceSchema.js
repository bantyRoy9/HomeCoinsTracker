const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
    sourceType:{
        type:String,
        require:true  
    },
    sourceName:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    },
    sourceInv:Number
},{
    timestamps:true
});

const  SourceModal = mongoose.model("Sources",sourceSchema);

module.exports = SourceModal;
