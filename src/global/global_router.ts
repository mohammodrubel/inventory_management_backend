import { Router } from 'express'
import { Auth } from '../router/auth_Router'
import { ProductRouter } from '../router/product_Router'
import { SalesRouter } from '../router/sales-Router'

const router = Router()

const myRouter = [
    { path: '/auth', route: Auth },
    { path: '/product', route: ProductRouter },
    { path: '/sales', route: SalesRouter },
]

myRouter.forEach((route) => router.use(route.path, route.route))

export default router
