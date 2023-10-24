const mongoose = require('mongoose');

const expendSchema = new mongoose.Schema({
    amount:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    expendBy: {
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    groupId:{
        type:mongoose.Schema.ObjectId,
        ref:'Group'
    }
});

const ExpendModel = mongoose.model('Expend',expendSchema);

module.exports = ExpendModel;
