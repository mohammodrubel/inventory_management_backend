import { T_Error_Sources, T_Generic_Error_Responce } from "../interface/Global_interface";

const mongooseDuplicateError = (err:any):T_Generic_Error_Responce =>{
// Extract value within double quotes using regex
const match = err.message.match(/"([^"]*)"/);

// The extracted value will be in the first capturing group
const extractedMessage = match && match[1];

const errorSources: T_Error_Sources = [
  {
    path: '',
    message: `${extractedMessage} is already exists`,
  },
];




    const statusCode = 500;
    return {
        statusCode,
        message: extractedMessage,
        errorSources
    };
}


export default mongooseDuplicateError