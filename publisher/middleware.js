const utils = require('./utils')
const httpCodes = require('../httpCodes')

module.exports.validateSubscribeRequest = (req, res, next) => {
  const { url } = req.body
  const statusCode = httpCodes.BAD_REQUEST

  if (!url) {
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: 'You must provide a url in your request body'
    })
  }

  if (!utils.validHttpUrl(url)) {
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: 'Invalid url provided'
    })
  }

  next()
}

module.exports.validatePublishRequest = async (req, res, next) => {
  const { body } = req
  const statusCode = httpCodes.BAD_REQUEST

  if (!body || typeof body !== 'object' || JSON.stringify(body) === '{}') {
    return res.status(statusCode).json({
      statusCode: statusCode,
      message: 'Cannot publish invalid data'
    })
  }

  next()
}
