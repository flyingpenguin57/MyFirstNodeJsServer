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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.register = exports.login = void 0;
const user_service_1 = require("../service/user-service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const token = yield (0, user_service_1.loginS)(user);
    const loginResult = {
        token: token
    };
    const result = {
        success: true,
        data: loginResult
    };
    res.status(200).json(result);
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    yield (0, user_service_1.createNewUser)(user);
    const result = {
        success: true
    };
    res.status(200).json(result);
});
exports.register = register;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_service_1.getUserInfoS)();
    const result = {
        success: true
    };
    res.status(200).json(result);
});
exports.getUserInfo = getUserInfo;
