const controller = require('./controller')
const middleware = require('./middleware')

module.exports.setupRoutes = (server) => {
  server.post(
    '/subscribe/:topic',
    middleware.validateSubscribeRequest,
    controller.subscribe
  )
  server.post(
    '/publish/:topic',
    middleware.validatePublishRequest,
    controller.publish
  )
}
