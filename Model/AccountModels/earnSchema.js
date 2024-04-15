const mongoose = require('mongoose');

const earnSchema = new mongoose.Schema({
    amount:{
        type:Number,
        require:true
    },
    source:{
        type:mongoose.Schema.ObjectId,
        ref:'Source'
    },
    date:{
        type:Date,
        require:true
    },
    earnBy: {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    createdBy: {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    }
},{
    timestamps:true
});

const EarnModel = mongoose.model('Earn',earnSchema);

module.exports = EarnModel;
