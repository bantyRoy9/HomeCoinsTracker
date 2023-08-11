const mongoose = require('mongoose');

const homeAccSchema = new mongoose.Schema({
    amount: {
        type:Number,
        require:true
    },
    earnBy:String,
    AvgTotal:Number,
    maxTotal:Number    
},{
    timestamps:true
});

const HomeAccSchemaModel = mongoose.Model('HomeAccount',homeAccSchema);

module.exports = HomeAccSchemaModel;
