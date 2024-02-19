import httpStatus from "http-status";
import { ProductService } from "../service/product_service";
import catchAsync from "../utils/catch__Async";
import sendResponce from "../utils/send_responce";

const addNewProduct = catchAsync(async(req,res,next)=>{
    const result = await ProductService.addNewProductService(req.body)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'New Product Create successfully',
        data: result
    })
})
const getAllProduct = catchAsync(async(req,res,next)=>{
    const result = await ProductService.getAllProductService(req.query)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'New Product showen successfully',
        data: result
    })
})
const updateProduct = catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const payload= req.body
    const result = await ProductService.updateProduct(id,payload)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Product Update successfully complete',
        data: result
    })
})
const DeleteProductController = catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const result = await ProductService.deleteProductservice(id)
    sendResponce(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Product delete successfully',
        data: result
    })
})


export const ProductController = {
    addNewProduct,
    getAllProduct,
    updateProduct,
    DeleteProductController
}