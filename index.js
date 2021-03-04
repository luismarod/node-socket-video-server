'use strict'
require('./config/config');

const app = require('express')();
const server = require('http').Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


io.on('connection', function (socket) {
  console.log('Usuario conectado')

  socket.broadcast.emit("newConnection", "Se ha unido una persona");

  socket.on('pause', (data) => {
    socket.broadcast.emit("pause", "pausa desde server");
  });

  socket.on('play', (data) => {
    socket.broadcast.emit("play", "play desde server");
  });

  socket.on('timeupdate', ({ time }) => {
    socket.broadcast.emit("timeupdate", { time });
  });
});




server.listen(PORT, () => {
  console.log(`Corriendo en puerto ${PORT}`)
})