const { formatDate } = require('./helper')

const originalConsole = {
  log: console.log,
  error: console.error,
  info: console.info
}

const wrapWithTimestamp = (originalFunction) => {
  return function (...args) {
    const timestamp = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
    originalFunction.apply(console, [`[${timestamp}]`, ...args])
  }
}

console.log = wrapWithTimestamp(originalConsole.log)
console.error = wrapWithTimestamp(originalConsole.error)
console.info = wrapWithTimestamp(originalConsole.info)
