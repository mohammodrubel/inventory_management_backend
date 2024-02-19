import httpStatus from 'http-status'
import AppError from '../error/AppError'
import { T_Sales } from '../interface/Sales_Interface'
import { Product } from '../model/product_model'
import { Sales } from '../model/sales_model'
import moment from 'moment'

const addNewSalesService = async (payload: T_Sales) => {
  const existingProduct = await Product.findById(payload.product);
  
  if (!existingProduct) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This product is not found');
  }

  if (existingProduct.quantity < payload.quantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient quantity available for this product');
  }

  // Deduct sold quantity from existing product quantity
  existingProduct.quantity -= payload.quantity;

  // Save the updated product quantity
  await existingProduct.save();

  // Create new sale
  const result = await Sales.create(payload);
  return result;
};

const getAllSalesService = async (payload:any) => {
    const startDateFormatted = moment(payload.startDate, 'M/D/YYYY').format('YYYY-MM-DD');
    const endDateFormatted = moment(payload.endDate, 'M/D/YYYY').format('YYYY-MM-DD');

    const result = await Sales.aggregate([
      {
        $match: {
          date: {
            $gte: startDateFormatted,
            $lte: endDateFormatted
          }
        }
      },
      {
        $lookup: {
          from: 'products', 
          localField: 'product', 
          foreignField: '_id', 
          as: 'data'
        }
      },
      {
        $unwind:'$data'
      }
    ]);
    return result;
}

const getAllQuantitySalesService = async (payload: any) => {
  const startDateFormatted = moment(payload.startDate, 'M/D/YYYY').format('YYYY-MM-DD');
  const endDateFormatted = moment(payload.endDate, 'M/D/YYYY').format('YYYY-MM-DD');

  const result = await Sales.aggregate([
      {
          $match: {
              date: {
                  $gte: startDateFormatted,
                  $lte: endDateFormatted
              }
          }
      },
      {
          $lookup: {
              from: 'products',
              localField: 'product',
              foreignField: '_id',
              as: 'data'
          }
      },
      {
          $unwind: '$data'
      },
      {
          $group: {
              _id: '$data.name',
              totalQuantity: { $sum: '$quantity' },
              totalPrice:{$sum:'$data.price'}
          }
      },
      {
          $project: {
              productName: '$_id',
              totalPrice: 1,
              totalQuantity: 1,
              _id: 0
          }
      }
  ]);
  return result;
}





const updateSales = async (id: string, payload: Record<string, unknown>) => {
  const result = await Sales.findByIdAndUpdate(id, payload, { new: true })
  return result
}
const deleteSalesservice = async (id: string) => {
  const result = await Sales.findByIdAndDelete(id)
  return result
}
export const SalesService = {
  addNewSalesService,
  getAllSalesService,
  updateSales,
  deleteSalesservice,
  getAllQuantitySalesService
}
