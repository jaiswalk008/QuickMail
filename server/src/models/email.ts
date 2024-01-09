import User from "./user";

import mongoose from 'mongoose';
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
export default mongoose.model('Email', emailSchema);