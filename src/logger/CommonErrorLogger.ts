import winston from 'winston';
import path from 'path';
import os from 'os';

const homeDir = os.homedir();

// 创建一个 logger 实例
const errorLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(homeDir, 'logs', 'error.log'), // 指定日志文件目录
      maxsize: 5242880, // 5MB
      maxFiles: 5, // 保留最近5个日志文件
      tailable: true
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

export default errorLogger
