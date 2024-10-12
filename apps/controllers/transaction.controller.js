import db from '../configs/database.js'
import productModel from '../models/product.model.js'
import transactionModel from '../models/transaction.model.js'
import ApiError from '../utils/ApiError.js'
import catchAsync from '../utils/catchAsync.js'
import { generatePageInfo, generateTrxId } from '../utils/helper.js'
import { appResponse } from '../utils/response.js'

const transactionController = {

  getAll: catchAsync(async (req, h) => {
    const { page = 1, limit = 8 } = req.query
    const { total } = await transactionModel.countAll().then(res => res[0])
    const pageInfo = generatePageInfo('transactions?', page, limit, total, req.query)

    const data = await transactionModel.selectAll(limit, (page - 1) * limit)

    return appResponse(h, 200, 'Success get transactions', { pageInfo, data })
  }),

  create: catchAsync(async (req, h) => {
    const trxId = generateTrxId()
    const getProductsInfo = await productModel.selectInSKU(req.payload.items.map(obj => obj.sku))
    const result = []

    await db.tx(async tx => {
      let totalAmount = 0
      for (const item of req.payload.items) {
        const productDetail = getProductsInfo.find(o => o.sku === item.sku)

        if (item.qty > productDetail.stock) throw new ApiError(400, `Sorry, there are only ${productDetail.stock} "${productDetail.title}" left at the moment`)

        const payloadItems = {
          transaction_id: trxId,
          sku: item.sku,
          qty: item.qty,
          amount: item.qty * productDetail.price
        }

        totalAmount += payloadItems.amount
        await productModel.reduceStockTx(item.qty, item.sku, tx)
        await transactionModel.insertItemsTx(payloadItems, tx)
      }

      const payloadMaster = {
        transaction_id: trxId,
        total_amount: totalAmount,
        receiver_phone: req.payload.receiver_phone,
        receiver_name: req.payload.receiver_name,
        receiver_address: req.payload.receiver_address
      }
      await transactionModel.insertTx(payloadMaster, tx)
    })

    return appResponse(h, 200, 'Success create transaction', result)
  })

}

export default transactionController
