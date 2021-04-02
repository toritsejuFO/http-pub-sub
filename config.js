module.exports = {
  subscriber: {
    app: {
      port: process.env.SUBSCRIBER_SERVER_PORT || 9000
    },
    // Configurable subscriber paths
    paths: process.env.PATHS.split(',') || ['/test1', '/test2']
  }
}
