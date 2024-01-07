const User = require("./user");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    sender:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    },
    subject:{
        type:String,
    },
    body:{
        type:String,
    },
    senderId:{
        type: Schema.Types.ObjectId,
        ref:User
    }
    
}, {
    timestamps: true
})
module.exports = mongoose.model('Email', emailSchema);