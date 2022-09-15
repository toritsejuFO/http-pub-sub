const service = require('./service')
const { OK, INTERNAL_SERVER_ERROR } = require('../httpCodes')

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
    ? res.status(OK).json({ statusCode: OK })
    : res
        .status(INTERNAL_SERVER_ERROR)
        .json({ statusCode: INTERNAL_SERVER_ERROR })
}
