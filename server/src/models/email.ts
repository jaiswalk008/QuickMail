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
    bodyHTML:{
        type:String,
    },
    bodyText:{
        type:String,
    },
    senderId:{
        type: String,
        
    },
    senderName:{
        type:String,
        ref:User
    },
    isRead:{
        type:Boolean,
        default:false
    },
    recieverName:{
        type:String,
    }
    
}, {
    timestamps: true
})
export default mongoose.model('Email', emailSchema);