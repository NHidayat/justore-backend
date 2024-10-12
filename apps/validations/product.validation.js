import Joi from 'joi'

export const createProductScheme = Joi.object({
  title: Joi.string().required(),
  image: Joi.any().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  stock: Joi.number().required()
})

export const getProductsScheme = Joi.object({
  page: Joi.number(),
  limit: Joi.number()
})
