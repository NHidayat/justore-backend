import ApiError from '../utils/ApiError.js'
import productModel from '../models/product.model.js'

const productService = {
  getBySKUWithValidation: async (sku) => {
    const result = await productModel.selectBySKU(sku)

    if (!result[0]?.id) throw new ApiError(404, 'Product is not found')
    return result[0]
  },

  getFromDummyJSON: async () => {
    return await fetch('https://dummyjson.com/products?limit=50')
      .then(res => res.json())
      .then(data => data)
  }
}

export default productService
