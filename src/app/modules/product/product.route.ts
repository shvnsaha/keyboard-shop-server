import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidations } from './product.validation'
import { ProductControllers } from './product.controller'

const router = Router()

router
  .post(
    '/',
    validateRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct,
  )
  .get('/', ProductControllers.getAllProducts)
  .get('/:id', ProductControllers.getSingleProduct)

export const ProductRoutes = router
