"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const emailSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    reciever: {
        type: String,
        required: true
    },
    subject: {
        type: String,
    },
    bodyHTML: {
        type: String,
    },
    bodyText: {
        type: String,
    },
    senderId: {
        type: String,
    },
    senderName: {
        type: String,
        ref: user_1.default
    },
    isRead: {
        type: Boolean,
        default: false
    },
    recieverName: {
        type: String,
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Email', emailSchema);
