const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
    sourceName:{
        type:String,
        require:true
    },
    sorceType:String,
    sourceEarn:{
        type:mongoose.Schema.ObjectId,
        ref:'EarnModal'
    },
    sourceEpend:{
        type:mongoose.Schema.ObjectId,
        ref:'ExpendModal'
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    sourceInv:Number
});

const  SourceModal = mongoose.model("Sources",sourceSchema);

module.exports = SourceModal;
