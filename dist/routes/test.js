"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 本路由测试使用
 */
const express_1 = require("express");
const router = (0, express_1.Router)();
//错误模拟
router.get('/error', (req, res) => {
    throw new Error('Something went wrong');
});
//post模拟
router.post('/data', (req, res) => {
    console.log(req.body);
    res.send('Data received');
});
exports.default = router;
