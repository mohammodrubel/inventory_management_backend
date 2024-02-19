import config from "../config"
import { RegisterService } from "../service/auth_service"
import catchAsync from "../utils/catch__Async"
import sendResponce from "../utils/send_responce"
import httpStatus from "http-status"

const newUserRegister = catchAsync(async(req,res,next)=>{
    const result = await RegisterService.userRegisterService(req.body)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'user create successfully',
        data: result
    })
})
const loginUser = catchAsync(async(req,res,next)=>{
    const result = await RegisterService.loginService(req.body)
    const {accessToken,refreshToken} = result
    res.cookie('refreshToken',refreshToken,{
        secure:config.node_env === 'production',
        httpOnly:true 
    })
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'user login successfully',
        data: {accessToken:accessToken}
    })
})
const getAllUsers = catchAsync(async(req,res,next)=>{
    const result = await RegisterService.getAllUsersService()
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'get All Users Showen successfully',
        data: result
    })
})
const refreshTokenControler = catchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies
    const result = await RegisterService.refreshTokenService(refreshToken)
    
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'AccessToken retrived successfully',
        data:result
    })
})


export const registrationController = {
    newUserRegister,
    getAllUsers,
    loginUser,
    refreshTokenControler
}