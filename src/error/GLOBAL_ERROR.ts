import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../config'
import { ZodError } from 'zod'
import zod_Error_Handeler from './zod_error_handeler'
import mongoose_Error_Handeler from './mongoose_Error_Handeler'
import CastError from './mongoose_castError'
import { T_Error_Sources } from '../interface/Global_interface'
import mongooseDuplicateError from './mongoose_duplicate_error'
import AppError from './AppError'

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  // set Deafult Value
  let statusCode = err?.statusCode || 500
  let message = err?.message || 'Something went wrong'
  let errorSources: T_Error_Sources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = zod_Error_Handeler(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }else if(err.name === 'ValidationError'){
    const simplifiedError = mongoose_Error_Handeler(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }else if (err.name === 'CastError'){
    const simplifiedError = CastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }else if (err.code === 11000){
    const simplifiedError = mongooseDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }else if (err instanceof AppError){
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
        {
            path:'',
            message:err?.message
        }
    ]
  }else if (err instanceof Error){
    message = err?.message
    errorSources = [
        {
            path:'',
            message:err?.message
        }
    ]
  }


  // Response with a more controlled error object
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:config.node_env === 'development' ? err?.stack : null,
    error: err,
  })
}

export default globalError