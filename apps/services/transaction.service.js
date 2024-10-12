import transactionModel from '../models/transaction.model.js'
import ApiError from '../utils/ApiError.js'

const transactionService = {

  getByIdValidate: async (trxId) => {
    const getData = await transactionModel.selectByTrxId(trxId).then(res => res[0])
    if (!getData?.id) throw new ApiError(404, 'Transaction is not found')
    return getData
  }

}

export default transactionService
