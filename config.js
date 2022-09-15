module.exports = {
  subscriber: {
    app: {
      port: process.env.SUBSCRIBER_SERVER_PORT || 9000
    },
    // Configurable subscriber paths
    paths: (process.env.PATHS && process.env.PATHS.split(',')) || [
      '/test1',
      '/test2'
    ]
  },
  publisher: {
    app: {
      port: process.env.PUBLISHER_SERVER_PORT || 8000
    }
  }
}
