import mongoose from "mongoose";
import { T_Error_Sources, T_Generic_Error_Responce } from "../interface/Global_interface";

const CastError = (err:mongoose.Error.CastError):T_Generic_Error_Responce=>{

const errorSources:T_Error_Sources =[
    {
        path:err?.path,
        message:err?.message
    }
] 




    const statusCode = 500;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources
    };
}

export default CastError