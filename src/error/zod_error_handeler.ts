import { ZodError, ZodIssue } from "zod"
import { T_Error_Sources, T_Generic_Error_Responce } from "../interface/Global_interface"

const zod_Error_Handeler = (err:ZodError):T_Generic_Error_Responce=>{

const errorSources:T_Error_Sources = err?.issues.map((issue:ZodIssue)=>{
    return {
        path:issue.path[issue.path.length -1],
        message:issue.message
    }
})



    const statusCode = 500 
    return {
        statusCode,
        message:'Validation Error',
        errorSources
    }

}





export default zod_Error_Handeler