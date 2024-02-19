import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (myFunction:RequestHandler)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        Promise.resolve(myFunction(req,res,next)).catch((err)=>next(err))
    }
}

export default catchAsync