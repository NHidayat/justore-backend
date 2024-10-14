import Joi from 'joi'

export const getAllProductScheme = Joi.object({
  page: Joi.number(),
  limit: Joi.number()
})

export const createProductScheme = Joi.object({
  title: Joi.string().max(255).required(),
  image: Joi.any().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  stock: Joi.number().required()
})

export const updateProductScheme = Joi.object({
  title: Joi.string().max(255).required(),
  image: Joi.any().allow('', null),
  price: Joi.number().required(),
  description: Joi.string().required(),
  stock: Joi.number().required()
})
