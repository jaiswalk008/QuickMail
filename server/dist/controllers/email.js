"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSentEmail = exports.deleteRecievedEmail = exports.getSendEmails = exports.markEmailAsRead = exports.inbox = exports.sendEmail = void 0;
const email_1 = __importDefault(require("../models/email"));
const user_1 = __importDefault(require("../models/user"));
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reciever = yield user_1.default.findOne({ email: req.body.reciever });
    console.log(reciever);
    const newEmail = new email_1.default(Object.assign(Object.assign({}, req.body), { sender: req.user.email, senderId: req.user._id.toString(), senderName: req.user.name, recieverName: reciever.name }));
    yield newEmail.save();
    res.json(newEmail);
});
exports.sendEmail = sendEmail;
const inbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.user.email);
        const inbox = yield email_1.default.find({ reciever: req.user.email });
        // console.log(inbox);
        res.json(inbox);
    }
    catch (error) {
        console.log(error);
    }
});
exports.inbox = inbox;
const markEmailAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailId = req.params.id;
    // console.log(emailId);
    try {
        yield email_1.default.findByIdAndUpdate({ _id: emailId }, { isRead: true });
        res.json({ message: 'Email marked as read' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.markEmailAsRead = markEmailAsRead;
const getSendEmails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sentEmails = yield email_1.default.find({ senderId: req.user._id });
        // console.log(sentEmails);
        res.json(sentEmails);
        // console.log(req.user);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getSendEmails = getSendEmails;
const deleteRecievedEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailId = req.params.id;
    // console.log(emailId);
    try {
        const email = yield email_1.default.findById({ _id: emailId });
        if (email.sender === '')
            yield email_1.default.findByIdAndDelete({ _id: emailId });
        else
            yield email_1.default.findByIdAndUpdate({ _id: emailId }, { reciever: "" });
        // console.log('email deleted');
        res.json({ message: 'Email deleted successfully' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteRecievedEmail = deleteRecievedEmail;
const deleteSentEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailId = req.params.id;
    // console.log(emailId);
    try {
        const email = yield email_1.default.findById({ _id: emailId });
        if (email.reciever === '')
            yield email_1.default.findByIdAndDelete({ _id: emailId });
        else
            yield email_1.default.findByIdAndUpdate({ _id: emailId }, { sender: "", senderId: "NA" });
        // console.log('email deleted');
        res.json({ message: 'Email deleted successfully' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteSentEmail = deleteSentEmail;
