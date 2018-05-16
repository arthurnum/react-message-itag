const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const io = require('socket.io');
const cheerio = require('cheerio');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const db = require('./db');

app.use(express.static(path.join(__dirname, 'react-message-cli/build')));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'react-message-cli/build', 'index.html'));
});

app.get('/messages', function (req, res) {
  let page = parseInt(req.query.page || 1);
  if (page < 1) { page = 1 }
  let options = {
    limit: 4,
    offset: (page - 1) * 4
  };
  db.item.findAll(options).then(items => {
    let result = items.map(i => { return i.get(); });
    return res.json({ page: page, items: result });
  });
});

const PORT = process.env.PORT || 8080
let httpServer = app.listen(PORT)

function syncGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = ''

      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', (e) => reject(e))
  })
}

async function loadOgSources(match, parseDataAndCreateOg) {
  while (url = match.pop()) {
    let data = await syncGet(url)
    parseDataAndCreateOg(data)
  }
}

// Websocket
let socketServer = new io(httpServer);
console.log('Socket');
socketServer.on('connection', (socket) => {
  console.log('connected');

  socket.on('newMessage', data => {
    db.message.create(JSON.parse(data)).then(async item => {
      itemData = item.get();
      socketServer.emit('newMessage', JSON.stringify(itemData));

      if (match = item.message.match(/(https:\/\/[\w.\/]+)/g)) {
        await loadOgSources(match, data => {
          let html = cheerio.load(data);
          tags = html('meta[property^="og:"]').toArray().map(tag => {return tag.attribs});
          let titleTag = tags.find(tag => tag.property == 'og:title')
          let descriptionTag = tags.find(tag => tag.property == 'og:description')
          let imageTag = tags.find(tag => tag.property == 'og:image')
          item.createOg({
            title: titleTag && titleTag.content,
            description: descriptionTag && descriptionTag.content,
            image: imageTag && imageTag.content,
          })
        })
      }

      db.message.findById(itemData.id, {include:[{model:db.og}]}).then(msg => {
        socketServer.emit('newMessage', JSON.stringify(msg.get({plain:true})));
      })

    })
  });

});
