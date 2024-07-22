import { NextFunction, Request, Response } from "express";
import apiLogger from "../logger/CommonLogger";

const requestLog = (req: Request, res: Response, next: NextFunction) => {
    const requestPath = req.path;
    const requestBody = req.body;
  
    apiLogger.info(`Request start, path: ${requestPath}, param: ${JSON.stringify(requestBody)}`);
  
    next();
}

export default requestLog