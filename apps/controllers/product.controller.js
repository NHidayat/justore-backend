import productModel from '../models/product.model.js'
import productService from '../services/product.service.js'
import catchAsync from '../utils/catchAsync.js'
import { generateQuery, generateSKU } from '../utils/helper.js'
import { appResponse } from '../utils/response.js'
import { deleteFile, upload } from '../utils/fileManage.js'

const productController = {

  getAll: catchAsync(async (req, h) => {
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

  getDetail: catchAsync(async (req, h) => {
    const { sku } = req.params

    const result = await productService.getBySKUWithValidation(sku)

    return appResponse(h, 200, 'Success get product detail', result)
  }),

  create: catchAsync(async (req, h) => {
    if (!req.payload.image) return appResponse(h, 400, 'Image is required')

    const payload = {
      ...req.payload,
      image: await upload(req.payload.image),
      sku: generateSKU()
    }

    await productModel.insert(payload)
    return appResponse(h, 200, 'Success create product', payload)
  }),

  update: catchAsync(async (req, h) => {
    const { sku } = req.params
    const newData = req.payload

    const getOldData = await productService.getBySKUWithValidation(sku)

    const payload = {
      title: newData.title || getOldData.title,
      image: newData.image ? await upload(newData.image) : getOldData.image,
      price: newData.price || getOldData.price,
      description: newData.description || getOldData.description,
      stock: newData.stock || getOldData.stock
    }

    await productModel.update(payload, sku)

    return appResponse(h, 201, 'Success update product', payload)
  }),

  delete: catchAsync(async (req, h) => {
    const { sku } = req.params

    const getData = await productService.getBySKUWithValidation(sku)

    await productModel.delete(sku)

    if (getData.image) {
      const getFilePath = new URL(getData.image).pathname
      await deleteFile('./' + getFilePath)
    }

    return appResponse(h, 200, 'Success delete product ' + sku)
  }),

  importProductsFromDummyJSON: catchAsync(async (req, h) => {
    const getData = await productService.getFromDummyJSON()

    for (const obj of getData.products) {
      await productModel.insert({ ...obj, image: obj.images[0] })
    }

    return appResponse(h, 200, 'Success import to database')
  })

}

export default productController
