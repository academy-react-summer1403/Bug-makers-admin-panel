const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('یک کاربر متصل شد');

  socket.on('sendMessage', (message) => {
    io.emit('message', message); // ارسال پیام به همه کاربران
  });

  socket.on('disconnect', () => {
    console.log('یک کاربر قطع اتصال یافت');
  });
});

server.listen(3000, () => {
  console.log('سرور در حال اجرا بر روی پورت 3000');
});
