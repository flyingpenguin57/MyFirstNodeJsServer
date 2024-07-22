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
exports.queryUserByUserName = queryUserByUserName;
exports.queryUserByEmail = queryUserByEmail;
exports.insertUser = insertUser;
const db_1 = __importDefault(require("../config/db"));
function queryUserByUserName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM User WHERE username = ?';
        const [rows] = yield db_1.default.execute(query, [username]);
        const users = rows;
        return users;
    });
}
function queryUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM User WHERE email = ?';
        const [rows] = yield db_1.default.execute(query, [email]);
        const users = rows;
        return users;
    });
}
function insertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'INSERT INTO User (username, email, password, phone) VALUES (?, ?, ?, ?)';
        yield db_1.default.execute(query, [user.username, user.email, user.password, user.phone]);
    });
}
