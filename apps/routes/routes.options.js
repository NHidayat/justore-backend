import { validateResponse } from '../utils/response.js'

export const multipartPayloadOptions = {
  allow: 'multipart/form-data',
  multipart: true,
  output: 'stream',
  parse: true,
  maxBytes: 3048576
}

export const validationOptions = (type, scheme) => ({
  validate: {
    [type]: scheme,
    options: {
      abortEarly: false
    },
    failAction: (_, h, err) => validateResponse(h, err)
  }
})
