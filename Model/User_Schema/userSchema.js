const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Name is Required']
    },
    userId:String,
    email:{
        type:String,
        // unique:true 
        require:[true, 'Email is Required'],
        validate:[validator.isEmail, 'Provide Valide Email']
    },
    mobile:{
        type:Number,
        require:true,
        validate:[validator.isMobile,'Provide Valid Mobile No']
    },
    password:{
        type:String,
        require:[true,'Password is Required'],
        minlength:4
    },
    confirmPassword:{
        type:String,
        require:[true,'Confirm Password is Required'],
        validate:{
            validator : function(el){
                return el === this.password
            },
            message:'Confirm Password Not Match!'
        }
    },
    role:{
        type:String,
        enum:['user','admin','supperAdmin'],
        default:'user'
    },
    totalExpend:{
        type: mongoose.Schema.ObjectId,
        ref: 'ExpendModel'
    },
    totalEarn:{
        type: mongoose.Schema.ObjectId,
        ref: 'ExpendModel'
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;
