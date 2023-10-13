const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Group name required']
    },
    members:[{
        member:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'admin'
        }
    }
    ],
    role:{
        type:String,
        enum:['user','admin'],
        default:'admin'
    },
    createdDate:{
        type:Date,
        default: new Date()
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
});
const GroupModels = mongoose.model('Group',groupSchema)
module.exports = GroupModels;