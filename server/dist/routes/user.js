"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_1 = require("../controllers/user");
router.post('/signup', user_1.addUser);
router.post('/login', user_1.login);
exports.default = router;
