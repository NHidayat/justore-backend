const appResponse = (h, statusCode = 500, message = null, data = null, stack) => {
  return h.response({
    statusCode,
    message,
    data,
    stack
  }).code(statusCode)
}
export default appResponse
