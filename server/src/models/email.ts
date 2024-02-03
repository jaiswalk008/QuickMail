import User from "./user";

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    subject:{
        type:String,
    },
    bodyHTML:{
        type:String,
    },
    senderId:{
        type: String,
        ref:User,
    },
    receiverId:{
        type: String,
        ref:User,
    },

    isRead:{
        type:Boolean,
        default:false
    },
    hasReceiverDeleted:{
        type:Boolean,
        default:false,
    },
    hasSenderDeleted:{
        type:Boolean,
        default:false,
    }
    
    
})
export default mongoose.model('Email', emailSchema);