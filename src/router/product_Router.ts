import express from 'express'
import { ProductController } from '../controller/product_Controller'
import { ROLE } from '../globalType/Global_Type'
import auth from '../middleware/auth'
import validationRequest from '../middleware/validation'
import productValidationSchema from '../validation/product_validation'

const router = express.Router()

router.post('/create-product',validationRequest(productValidationSchema),ProductController.addNewProduct)
router.get('/',auth(ROLE.admin),ProductController.getAllProduct)
router.put('/:id',ProductController.updateProduct)
router.delete('/:id',ProductController.DeleteProductController)


export const ProductRouter = router