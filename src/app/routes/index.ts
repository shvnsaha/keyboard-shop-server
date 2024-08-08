import { Router } from 'express'
import { ProductRoutes } from '../modules/product/product.route'
import { OrderRoutes } from '../modules/order/order.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
