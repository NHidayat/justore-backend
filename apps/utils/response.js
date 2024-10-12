export const appResponse = (h, statusCode = 500, message = null, data = null, stack) => {
  return h.response({
    statusCode,
    message,
    data,
    stack
  }).takeover().code(statusCode)
}

export const validateResponse = (h, err) => {
  return appResponse(h, 400, err.details[0].message, err.details.map(o => ({ key: o.context.key, message: o.message })))
}
