const Joi = require('joi')
const productController = require('../controllers/product.controller')

const productRoutes = [
  {
    method: 'GET',
    path: '/products',
    handler: productController.getProducts,
    options: {
      validate: {
        query: Joi.object({
          page: Joi.number(),
          limit: Joi.number()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/products/{sku}',
    handler: productController.getBySKU
  },
  // { method: 'POST', path: '/products', handler: productController.createProduct },
  // { method: 'PUT', path: '/products/{sku}', handler: productController.updateProduct },
  // { method: 'DELETE', path: '/products/{sku}', handler: productController.deleteProduct },
  {
    method: 'POST',
    path: '/products/import',
    handler: productController.importProductsFromDummyJSON
  }
]

module.exports = productRoutes
