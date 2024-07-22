"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserInfoHolder_1 = __importDefault(require("./UserInfoHolder"));
const CreateStore = (req, res, next) => {
    const store = new Map();
    UserInfoHolder_1.default.run(store, () => {
        next();
    });
};
exports.default = CreateStore;
