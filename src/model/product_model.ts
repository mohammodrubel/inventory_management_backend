import { Schema, model } from "mongoose";
import { T_product } from "../interface/product_interface";

const productModelSchema = new Schema<T_product>({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    productPhoto:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    }
},{
    timestamps:true
})



export const Product = model<T_product>('product',productModelSchema)