const https = require('https')

function syncHttpsGet(url) {

  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', (e) => reject(e))

  }).catch(e => console.log(e))
}

module.exports = syncHttpsGet
