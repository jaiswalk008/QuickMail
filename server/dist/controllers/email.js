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
exports.deleteEmail = exports.markEmailAsRead = exports.retrieveEmails = exports.sendEmail = void 0;
const Email_1 = __importDefault(require("../models/Email"));
const user_1 = __importDefault(require("../models/user"));
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiver = yield user_1.default.findOne({ email: req.body.reciever });
        if (!receiver)
            return res.status(400).json({ message: 'No user with this email' });
        const { subject, bodyHTML, bodyText } = req.body;
        const newEmail = new Email_1.default({ subject, bodyHTML,
            senderId: req.user._id.toString(), receiverId: receiver._id.toString() });
        yield newEmail.save();
        res.json(newEmail);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendEmail = sendEmail;
const retrieveEmails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.user.email);
        const receivedEmails = yield Email_1.default.find({ receiverId: req.user._id.toString(), hasReceiverDeleted: false });
        const sendersPromise = receivedEmails.map((email) => __awaiter(void 0, void 0, void 0, function* () {
            const sender = yield user_1.default.findById({ _id: email.senderId });
            return sender;
        }));
        const senders = yield Promise.all(sendersPromise);
        console.log('senders....');
        console.log(senders);
        console.log('sent emails....');
        const sentEmails = yield Email_1.default.find({ senderId: req.user._id.toString(), hasSenderDeleted: false });
        console.log(sentEmails);
        const receiversPromise = sentEmails.map((email) => __awaiter(void 0, void 0, void 0, function* () {
            const receiver = yield user_1.default.findById({ _id: email.receiverId });
            return receiver;
        }));
        const receivers = yield Promise.all(receiversPromise);
        console.log('receivers....');
        console.log(receivers);
        res.json({ receivedEmails, sentEmails, senders, receivers });
    }
    catch (error) {
        console.log(error);
    }
});
exports.retrieveEmails = retrieveEmails;
const markEmailAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailId = req.params.id;
    // console.log(emailId);
    try {
        yield Email_1.default.findByIdAndUpdate({ _id: emailId }, { isRead: true });
        res.json({ message: 'Email marked as read' });
    }
    catch (err) {
        console.log(err);
    }
});
exports.markEmailAsRead = markEmailAsRead;
const deleteEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailId = req.params.id;
    try {
        const email = yield Email_1.default.findById({ _id: emailId });
        if (email.senderId === req.user._id.toString()) {
            email.hasReceiverDeleted
                ? yield Email_1.default.findByIdAndDelete(email._id)
                : yield Email_1.default.findByIdAndUpdate(email._id, { hasSenderDeleted: true });
        }
        else {
            email.hasSenderDeleted
                ? yield Email_1.default.findByIdAndDelete(email._id)
                : yield Email_1.default.findByIdAndUpdate(email._id, { hasReceiverDeleted: true });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.deleteEmail = deleteEmail;
