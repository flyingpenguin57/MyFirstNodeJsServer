"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user-controller");
const async_handler_1 = __importDefault(require("./util/async-handler"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const CreateStore_1 = __importDefault(require("../middleware/threadlocal/CreateStore"));
const router = (0, express_1.Router)();
router.post('/register', (0, async_handler_1.default)(user_controller_1.register));
router.post('/login', (0, async_handler_1.default)(user_controller_1.login));
router.post('/userInfo', CreateStore_1.default, (0, async_handler_1.default)(verifyToken_1.default), (0, async_handler_1.default)(user_controller_1.getUserInfo));
exports.default = router;
