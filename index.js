require('./apps/utils/customConsole')
const Hapi = require('@hapi/hapi')
const routes = require('./apps/routes')
const config = require('./apps/configs/config')

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: 'localhost'
  })

  server.ext('onRequest', (request, h) => {
    console.log(`${request.method.toUpperCase()} ${request.path}`)
    return h.continue
  })

  server.route(routes)
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
