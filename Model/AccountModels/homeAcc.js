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

const HomeAccSchemaModel = mongoose.model('HomeAccount',homeAccSchema);

module.exports = HomeAccSchemaModel;
