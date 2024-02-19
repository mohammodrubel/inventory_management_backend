import { NextFunction, Request, Response } from "express"
import { T_User_Role } from "../globalType/Global_Type"
import catchAsync from "../utils/catch__Async"
import httpStatus from "http-status"
import AppError from "../error/AppError"
import config from "../config"
import { JwtPayload } from "jsonwebtoken"
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
      interface Request {
        user: {
          email: string
          status: string
          role: string
          isDeleted: boolean
          iat?:number
          exp?:number
        }
      }
    }
  }
  
const auth = (...requiredRole:(string | T_User_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized');
    }

    try {
      const decoded = jwt.verify(token, config.access__token as string) as JwtPayload;
      const { email, status, role, isDeleted } = decoded;
        if(requiredRole && !requiredRole.includes(role)){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized !',);
        }
      req.user = {
        email,
        status,
        role,
        isDeleted,
      };

      next();
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
  });
};

export default auth;
