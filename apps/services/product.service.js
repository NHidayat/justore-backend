const ApiError = require('../utils/ApiError')
const productModel = require('../models/product.model')

const productService = {
  getBySKUWithValidation: async (sku) => {
    const result = await productModel.selectBySKU(sku)

    if (!result[0]?.id) throw new ApiError(404, 'Product is not found')
    return result[0]
  }
}

module.exports = productService
