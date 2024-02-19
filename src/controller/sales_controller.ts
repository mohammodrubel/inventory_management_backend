import httpStatus from "http-status";
import catchAsync from "../utils/catch__Async";
import sendResponce from "../utils/send_responce";
import { SalesService } from "../service/sales_service";

const addNewSales = catchAsync(async(req,res,next)=>{
    const result = await SalesService.addNewSalesService(req.body)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'successfully buy product',
        data: result
    })
})
const getAllSales = catchAsync(async(req,res,next)=>{
    const result = await SalesService.getAllSalesService(req.query)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'show all buy product successfully',
        data: result
    })
})
const getAllQuantitySales = catchAsync(async(req,res,next)=>{
    const result = await SalesService.getAllQuantitySalesService(req.query)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'show all buy product successfully',
        data: result
    })
})
const updateSales = catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const payload= req.body
    const result = await SalesService.updateSales(id,payload)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'buy update product complete',
        data: result
    })
})
const DeleteSalesController = catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const result = await SalesService.deleteSalesservice(id)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'delete successfully',
        data: result
    })
})


export const SalesController = {
    addNewSales,
    getAllSales,
    updateSales,
    DeleteSalesController,
    getAllQuantitySales
}