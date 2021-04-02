require('dotenv').config()
require('express-async-errors')
const express = require('express')

const httpCodes = require('../httpCodes')
const config = require('../config').subscriber
const router = require('./router')

const server = express()
server.use(express.json())
router.setupRoutes(server, config.paths)

// Catch all undefined routes
server.use((req, _, next) => {
  const message = `Bad request. Can not ${req.method} to ${req.path}`
  next({ code: httpCodes.BAD_REQUEST, message })
})

// Catch all async errors
server.use((error, _, res, __) => {
  const statusCode = error.code || httpCodes.INTERNAL_SERVER_ERROR
  const message = error.message || 'Internal Server Error'
  res.status(statusCode).json({ statusCode, message })
})

server.listen(config.app.port, () => {
  console.log('Subsriber server running on port:', config.app.port)
})
