import express from 'express'
import { ProductController } from '../controller/product_Controller'
import { ROLE } from '../globalType/Global_Type'
import auth from '../middleware/auth'
import { SalesController } from '../controller/sales_controller'


const router = express.Router()

router.post('/sales-product',SalesController.addNewSales)
router.get('/',auth(ROLE.admin),SalesController.getAllSales)
router.get('/product',auth(ROLE.admin),SalesController.getAllQuantitySales)
router.put('/:id',SalesController.updateSales)
router.delete('/:id',SalesController.DeleteSalesController)


export const SalesRouter = router