"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const email_1 = require("../controllers/email");
const auth_1 = __importDefault(require("../middleware/auth"));
router.post('/mail', auth_1.default, email_1.sendEmail);
router.get('/mail', auth_1.default, email_1.retrieveEmails);
router.patch('/mail/:id', email_1.markEmailAsRead);
router.delete('/mail/:id', auth_1.default, email_1.deleteEmail);
exports.default = router;
