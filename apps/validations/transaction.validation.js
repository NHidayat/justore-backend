import Joi from 'joi'

export const getAllTransactionsScheme = Joi.object({
  page: Joi.number().required(),
  limit: Joi.number().required()
})

export const createTransactionScheme = Joi.object({
  receiver_phone: Joi.string().max(16).required(),
  receiver_name: Joi.string().max(100).required(),
  receiver_address: Joi.string().max(500).required(),
  items: Joi.array().items(Joi.object({
    sku: Joi.string().max(100).required(),
    qty: Joi.number().required()
  })).min(1)
})
