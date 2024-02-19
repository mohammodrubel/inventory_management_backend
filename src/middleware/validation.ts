import { AnyZodObject } from "zod";
import catchAsync from "../utils/catch__Async";
import {Request,Response,NextFunction} from 'express'

const validationRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
         await schema.parseAsync({
             body: req.body ,
             cookies:req.cookies
         });
         next();
    });
 }
 

export default validationRequest