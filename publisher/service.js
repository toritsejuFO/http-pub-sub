const axios = require('axios')
const { OK } = require('../httpCodes')

// one topic to many subscribers map
const TOPIC_SUBCRIBERS_MAP = {}
const FULFILLED = 'fulfilled'

module.exports.subscribe = (topic, url) => {
  // subscribe url to new topic
  if (!TOPIC_SUBCRIBERS_MAP[topic]) {
    TOPIC_SUBCRIBERS_MAP[topic] = [url]
    return
  }

  // Prevent duplicate subscription of same url
  const urlIsAlreadySubscribed = TOPIC_SUBCRIBERS_MAP[topic].find(
    (existingUrl) => url === existingUrl
  )
  if (!urlIsAlreadySubscribed) {
    TOPIC_SUBCRIBERS_MAP[topic].push(url)
  }
}

module.exports.publish = async (topic, data) => {
  if (!_topicExist(topic) || !_topicHasSubscribers(topic)) {
    return true
  }

  const subsribedUrls = TOPIC_SUBCRIBERS_MAP[topic]

  // Make http calls concurrently
  const publishPromises = subsribedUrls.map((url) => _publish(url, topic, data))
  const responses = await Promise.allSettled(publishPromises)

  // Log any failure to publish to a subscribed endpoint
  responses.map(({ status: promise, value: httpResponse }, index) => {
    if (promise !== FULFILLED || httpResponse.status !== OK) {
      console.log(`Error publishing to ${subsribedUrls[index]}`)
    }
  })

  // If at least one subscribed endpoint succeeds, return true
  return responses.some(
    ({ status: promise, value: httpResponse }) =>
      promise === FULFILLED && httpResponse.status === OK
  )
}

// Helpers
const _topicExist = (topic) => {
  return TOPIC_SUBCRIBERS_MAP[topic]
}

const _topicHasSubscribers = (topic) => {
  return TOPIC_SUBCRIBERS_MAP[topic].length
}

const _publish = (url, topic, data) => {
  return axios.post(
    url,
    { topic, data },
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
