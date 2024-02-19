import mongoose, { ObjectId } from "mongoose";

export type T_Sales = {
    name:string;
    quantity:number;
    date:string;
    product:mongoose.ObjectId
}