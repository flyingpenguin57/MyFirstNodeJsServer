import { NextFunction, Request, Response } from "express";
import UserInfoHolder from "./UserInfoHolder";

const CreateStore = (req: Request, res: Response, next: NextFunction) => {
    const store = new Map<string, any>();
    UserInfoHolder.run(store, () => {
      next();
    });
}

export default CreateStore