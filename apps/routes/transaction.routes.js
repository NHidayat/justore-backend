import transactionController from '../controllers/transaction.controller.js'
import { createTransactionScheme, getAllTransactionsScheme } from '../validations/transaction.validation.js'
import { validationOptions } from './routes.options.js'

const transactionRoutes = [

  {
    method: 'GET',
    path: '/transactions',
    options: {
      ...validationOptions('query', getAllTransactionsScheme)
    },
    handler: transactionController.getAll
  },

  {
    method: 'GET',
    path: '/transactions/{transactionId}',
    handler: transactionController.getDetail
  },

  {
    method: 'POST',
    path: '/transactions',
    options: {
      ...validationOptions('payload', createTransactionScheme)
    },
    handler: transactionController.create
  }

]

export default transactionRoutes
