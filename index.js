import './apps/utils/customConsole.js'
import Hapi from '@hapi/hapi'
import routes from './apps/routes/index.js'
import config from './apps/configs/config.js'

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
