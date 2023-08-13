const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is requiredd']
    },
    userId:String,
    email:{
        type:String,
        // unique:true 
        required:[true, 'Email is requiredd'],
        validate:[validator.isEmail, 'Provide Valide Email']
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:[true,'Password is requiredd'],
        minlength:4
    },
    confirmPassword:{
        type:String,
        required:[true,'Confirm Password is requiredd'],
        validate:{
            validator : function(el){
                return (el === this.password)
            },
            message:'Confirm Password Not Match!'
        }
    },
    role:{
        type:String,
        enum:['user','admin','superAdmin'],
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

userSchema.pre('save', async function(next){
    this.userId = `${this.name}${Math.trunc((Math.random()+1)*10000)}`
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;
