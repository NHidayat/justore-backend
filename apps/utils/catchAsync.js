import config from '../configs/config.js'
import { appResponse } from './response.js'

const catchAsync = (fn) => {
  return async (request, h) => {
    try {
      return await fn(request, h)
    } catch (err) {
      const errCode = err.statusCode || 500

      if (config.appEnvironment !== 'production') {
        console.error(err)
      }

      return appResponse(h, errCode, err.message || 'Internal Server Error', err.data || null)
    }
  }
}

export default catchAsync
