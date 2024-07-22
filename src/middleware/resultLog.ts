import onFinished from 'on-finished'
import apiLogger from '../logger/CommonLogger'
import { NextFunction, Request, Response } from 'express'

const resultLog = (req: Request, res: Response, next: NextFunction) => {
    let oldSend = res.send;
    let responseBody: any;
  
    res.send = function (body) {
      responseBody = body;
      return oldSend.apply(res, arguments as any);
    };
  
    onFinished(res, (err, res) => {
      apiLogger.info(`Response body: ${JSON.stringify(responseBody)}`);
    });
  
    next();
}

export default resultLog