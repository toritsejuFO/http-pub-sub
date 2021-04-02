const service = require('./service')
const httpCodes = require('../httpCodes')

module.exports.subscribe = (req, res) => {
  const { topic } = req.params
  const { url } = req.body

  service.subscribe(topic, url)
  return res.status(httpCodes.CREATED).json({ url, topic })
}

module.exports.publish = async (req, res) => {
  const { topic } = req.params
  const { body } = req

  const success = await service.publish(topic, body)

  return success
    ? res.status(httpCodes.OK).json({ statusCode: httpCodes.OK })
    : res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ statusCode: httpCodes.INTERNAL_SERVER_ERROR })
}
