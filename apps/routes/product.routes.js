import productController from '../controllers/product.controller.js'
import { validateResponse } from '../utils/response.js'
import { createProductScheme, getProductsScheme } from '../validations/product.validation.js'

const productRoutes = [
  {
    method: 'GET',
    path: '/products',
    options: {
      validate: {
        query: getProductsScheme,
        failAction: (_, h, err) => {
          return validateResponse(h, err)
        }
      }
    },
    handler: productController.getProducts
  },

  {
    method: 'GET',
    path: '/products/{sku}',
    handler: productController.getBySKU
  },

  {
    method: 'POST',
    path: '/products',
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        parse: true,
        maxBytes: 1048576
      },
      validate: {
        payload: createProductScheme,
        failAction: (_, h, err) => {
          return validateResponse(h, err)
        }
      }
    },
    handler: productController.create
  },

  // { method: 'PUT', path: '/products/{sku}', handler: productController.updateProduct },
  // { method: 'DELETE', path: '/products/{sku}', handler: productController.deleteProduct },
  {
    method: 'POST',
    path: '/products/import',
    handler: productController.importProductsFromDummyJSON
  }
]

export default productRoutes
