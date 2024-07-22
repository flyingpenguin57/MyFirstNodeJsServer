"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user"));
const test_1 = __importDefault(require("./routes/test"));
const requestLog_1 = __importDefault(require("./middleware/requestLog"));
const resultLog_1 = __importDefault(require("./middleware/resultLog"));
const CommonErrorLogger_1 = __importDefault(require("./logger/CommonErrorLogger"));
const app = (0, express_1.default)();
const port = 3000;
// 使用 body-parser 解析 JSON 请求体
app.use(body_parser_1.default.json());
app.use(requestLog_1.default);
// 自定义中间件来捕获响应体
app.use(resultLog_1.default);
app.use("/test", test_1.default);
app.use("/user", user_1.default);
// 错误处理中间件
app.use((err, req, res, next) => {
    res.status(200).json({
        success: false,
        errorMessage: err.message
    });
    CommonErrorLogger_1.default.error(err.message);
    next();
});
// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
