import { Schema, model } from "mongoose";
import { T_Sales } from "../interface/Sales_Interface";

const SalesSchema = new Schema<T_Sales>({
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
        required:true
    }
},{
    timestamps:true
})

export const Sales = model<T_Sales>('sale',SalesSchema)