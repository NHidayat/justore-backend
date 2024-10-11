import productModel from '../models/product.model.js'
import productService from '../services/product.service.js'
import catchAsync from '../utils/catchAsync.js'
import { getPrevLink, getNextLink } from '../utils/helper.js'
import appResponse from '../utils/appResponse.js'

const productController = {

  getProducts: catchAsync(async (req, h) => {
    const { page = 1, limit = 8 } = req.query
    const offset = (page - 1) * limit
    const getTotalData = await productModel.countAll()
    const totalPage = Math.ceil(getTotalData[0].total / limit)

    const pageInfo = {
      page,
      totalPage,
      totalData: getTotalData[0].total,
      limit,
      prevLink: getPrevLink(page, req.query),
      nextLink: getNextLink(page, getTotalData[0].total, req.query)
    }

    const getData = await productModel.selectAll(limit, offset)
    return appResponse(h, 200, 'OK', { pageInfo, data: getData })
  }),

  getBySKU: catchAsync(async (req, h) => {
    const result = await productService.getBySKUWithValidation(req.params.sku)
    return appResponse(h, 200, 'Success get product detail', result)
  }),

  importProductsFromDummyJSON: catchAsync(async (req, h) => {
    const getFromDummyJSON = await fetch('https://dummyjson.com/products?limit=50')
      .then(res => res.json())
      .then(data => data)

    const result = []
    for (const obj of getFromDummyJSON.products) {
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
