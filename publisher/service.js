const axios = require('axios')

const TOPIC_SUBCRIBER_CACHE = {}

module.exports.subscribe = (topic, url) => {
  if (TOPIC_SUBCRIBER_CACHE[topic]) {
    // Prevent duplicate subscription of same url
    const urlIsAlreadySubscribed = TOPIC_SUBCRIBER_CACHE[topic].find((existingUrl) => url === existingUrl)
    if (!urlIsAlreadySubscribed) {
      TOPIC_SUBCRIBER_CACHE[topic].push(url)
    }
  } else {
    TOPIC_SUBCRIBER_CACHE[topic] = [url]
  }
}

module.exports.publish = async (topic, data) => {
  if (!_topicExistsAndHasSubscribers(topic)) {
    return true
  }

  const subsribedUrls = TOPIC_SUBCRIBER_CACHE[topic]

  // TODO: Improve by running concurrently rather than in a loop
  let results = []
  for (let url of subsribedUrls) {
    const result = await _publish(url, topic, data)
    results.push(result)
  }

  return results.every((result) => result)
}

// Helpers
const _topicExistsAndHasSubscribers = (topic) => {
  return TOPIC_SUBCRIBER_CACHE[topic] && TOPIC_SUBCRIBER_CACHE[topic].length
}

const _publish = (url, topic, data) => {
  return axios
    .post(
      url,
      { topic, data },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then((response) => response.status === 200)
    .catch(() => false)
}
