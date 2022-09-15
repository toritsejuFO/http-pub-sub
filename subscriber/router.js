const controller = require('./controller')

module.exports.setupRoutes = (server, paths) => {
  paths.forEach((path) => {
    server.post(`${path}`, controller.printData)
  })
}
