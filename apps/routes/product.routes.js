import productController from '../controllers/product.controller.js'
import { createProductScheme, getAllProductScheme } from '../validations/product.validation.js'
import { multipartPayloadOptions, validationOptions } from './routes.options.js'

const productRoutes = [
  {
    method: 'GET',
    path: '/products',
    options: {
      ...validationOptions('query', getAllProductScheme)
    },
    handler: productController.getAll
  },

  {
    method: 'GET',
    path: '/products/{sku}',
    handler: productController.getDetail
  },

  {
    method: 'POST',
    path: '/products',
    options: {
      payload: multipartPayloadOptions,
      ...validationOptions('payload', createProductScheme)
    },
    handler: productController.create
  },

  {
    method: 'PUT',
    path: '/products/{sku}',
    options: {
      payload: multipartPayloadOptions,
      ...validationOptions('payload', createProductScheme)
    },
    handler: productController.update
  },

  {
    method: 'DELETE',
    path: '/products/{sku}',
    handler: productController.delete
  },

  {
    method: 'POST',
    path: '/products/import',
    handler: productController.importProductsFromDummyJSON
  }
]

export default productRoutes
