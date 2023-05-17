const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    }
})

exports.User = mongoose.model("User",userSchema);