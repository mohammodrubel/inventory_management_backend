import mongoose from 'mongoose';
import { T_Error_Sources, T_Generic_Error_Responce } from '../interface/Global_interface';

const mongoose_Error_Handeler = (err: mongoose.Error.ValidationError):T_Generic_Error_Responce => {
     const errorSources: T_Error_Sources = Object.values(err?.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
       return{
        path: val?.path,
        message: val?.message
       }
    });

    const statusCode = 500;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources
    };
};

export default mongoose_Error_Handeler;