"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const emailSchema = new Schema({
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
        ref: user_1.default,
    },
    receiverId: {
        type: String,
        ref: user_1.default,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    hasReceiverDeleted: {
        type: Boolean,
        default: false,
    },
    hasSenderDeleted: {
        type: Boolean,
        default: false,
    }
});
exports.default = mongoose_1.default.model('Email', emailSchema);
