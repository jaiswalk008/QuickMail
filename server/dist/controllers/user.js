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
exports.login = exports.addUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const userFound = yield user_1.default.findOne({ email: email });
        const saltRounds = 10;
        if (userFound) {
            res.status(409).json({ "message": "Email already exist!!!" });
        }
        else {
            bcrypt_1.default.hash(password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.status(404).json({ "message": "Something went wrong!" });
                }
                else {
                    const user = new user_1.default({ name: name, email: email, password: hash });
                    yield user.save();
                    res.status(200).json(user);
                }
            }));
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.addUser = addUser;
const generateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ userId: id }, process.env.JWT_SECRET_KEY);
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email: email });
    if (user) {
        bcrypt_1.default.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(404).json({ "message": "Something went wrong!" });
            }
            else if (result) {
                res.status(200).json({ success: true, message: 'Log in Success', token: generateAccessToken(user.id), "username": user.name });
            }
            else {
                res.status(501).json({ "message": "password incorrect" });
            }
        });
    }
    else {
        res.status(404).json({ "message": "User not found!" });
    }
});
exports.login = login;
