import productRoutes from './product.routes.js'
import transactionRoutes from './transaction.routes.js'

const routes = [
  ...productRoutes,
  ...transactionRoutes
]

export default routes
