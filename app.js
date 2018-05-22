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
const og = require('./services/openGraph')

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


// Websocket
let socketServer = new io(httpServer);
console.log('Socket');
socketServer.on('connection', (socket) => {
  console.log(`Connected ${socket.request.headers['user-agent']}`);

  socket.on('newMessage', newMessageHandler);
});

async function newMessageHandler(data) {
  let item = await db.message.create(JSON.parse(data))
  let itemData = item.get();
  socketServer.emit('newMessage', JSON.stringify(itemData));

  if (match = item.message.match(/(https:\/\/[\w.\/]+)/g)) {
    await og.getForItem(item, match)
  }

  console.log('Before Reload Message')
  let msg = await item.reload({ include: [{ model:db.og }] })
  let message = msg.get({ plain: true })
  console.log('Emit message:')
  console.log(message)
  socketServer.emit('newMessage', JSON.stringify(message))
}
