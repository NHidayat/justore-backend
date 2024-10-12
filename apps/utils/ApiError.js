class ApiError extends Error {
  constructor (statusCode, message, data = null, stack = '') {
    super(message)
    this.statusCode = statusCode
    this.data = data
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
