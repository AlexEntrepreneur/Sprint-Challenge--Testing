const express = require('express');
const server = express();
const gamesRouter = require('./routers/gamesRouter');

server.use('/games', gamesRouter);

server.get('/', (req, res) => {
  res.send('Welcome To My Games API!');
});

module.exports = server;
