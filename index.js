import './apps/utils/customConsole.js'
import Hapi from '@hapi/hapi'
import routes from './apps/routes/index.js'
import config from './apps/configs/config.js'
import inert from '@hapi/inert'
import { fileURLToPath } from 'url'
import path from 'path'
import { appResponse } from './apps/utils/response.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: 'localhost'
  })

  await server.register(inert)

  server.ext('onRequest', (request, h) => {
    console.log(`${request.method.toUpperCase()} ${request.path}`)
    return h.continue
  })

  server.route(routes)

  server.route({
    method: '*',
    path: '/{any*}',
    handler: (_, h) => appResponse(h, 404, 'Not Found')
  })

  server.route({
    method: 'GET',
    path: '/uploads/{filename}',
    handler: {
      file: (request) => {
        return path.join(__dirname, config.uploadDir, request.params.filename)
      }
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
