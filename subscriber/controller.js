const httpCodes = require('../httpCodes')

module.exports.printData = (req, res) => {
  const { topic, data } = req.body

  console.log('Message recieved at subscriber path:', req.path)
  console.log('Topic:', topic)
  console.log('Data:', data, '\n')

  const statusCode = httpCodes.OK
  return res.status(statusCode).json({ statusCode, message: 'Message received' })
}
