const mongoose = require('mongoose');

const expendSchema = new mongoose.Schema({
    amount:{
        type:Number,
        require:true
    },
    expendType:{
        type:mongoose.Schema.ObjectId,
        ref:'ExpendType'
    },
    description:String,
    date:{
        type:Date,
        require:true
    },
    expendBy: {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    updatedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    updatedDate:{
        type:Date,
        require:true
    },
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    }
});

const ExpendModel = mongoose.model('Expend',expendSchema);

module.exports = ExpendModel;
