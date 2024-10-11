import productModel from '../models/product.model.js'
import productService from '../services/product.service.js'
import catchAsync from '../utils/catchAsync.js'
import { generateQuery } from '../utils/helper.js'
import appResponse from '../utils/appResponse.js'

const productController = {

  getProducts: catchAsync(async (req, h) => {
    const { page = 1, limit = 8 } = req.query
    const offset = (page - 1) * limit

    const { total } = await productModel.countAll().then(res => res[0])
    const totalPage = Math.ceil(total / limit)

    const pageInfo = {
      page,
      totalPage,
      totalData: total,
      limit,
      prev: generateQuery('/product?', page, totalPage, req.query, 'prev'),
      next: generateQuery('/product?', page, totalPage, req.query, 'next')
    }

    const data = await productModel.selectAll(limit, offset)

    return appResponse(h, 200, 'OK', { pageInfo, data })
  }),

  getBySKU: catchAsync(async (req, h) => {
    const result = await productService.getBySKUWithValidation(req.params.sku)
    return appResponse(h, 200, 'Success get product detail', result)
  }),

  importProductsFromDummyJSON: catchAsync(async (req, h) => {
    const getData = await productService.getFromDummyJSON()

    const result = []
    for (const obj of getData.products) {
      await productModel.insert({
        id: obj.id,
        title: obj.title,
        sku: obj.sku,
        image: obj.images[0],
        price: obj.price,
        description: obj.description,
        stock: obj.stock
      })
    }

    return appResponse(h, 200, 'Success import to database', result)
  })

}

export default productController
