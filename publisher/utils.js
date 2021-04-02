const { URL } = require('url')
const httpProtocols = ['http:', 'https:']

module.exports.validHttpUrl = (url) => {
  let parsedUrl
  try {
    parsedUrl = new URL(url)
  } catch (error) {
    return false
  }

  return httpProtocols.includes(parsedUrl.protocol)
}
