const socketio = require('socket.io');
const http = require('http');
const passport = require('passport');
const app = require('../app');
const logger = require('../config/logger');
const config = require('../config/config');
const auth = require('../middlewares/auth');

const server = http.Server(app);
server.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization',
    ],
  },
});

const wrapMiddlewareForSocketIo = (middleware) => (socket, next) => middleware(socket.request, {}, next);
io.use(wrapMiddlewareForSocketIo(auth('')));
io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  logger.info(`Socket connection: ${socket.id}`);
  socket.on('whoami', (cb) => {
    cb(socket.request.user);
  });
  socket.on('client-send',(data)=>{
    console.log(data);
    socket.broadcast.emit("hello", socket.request.user);
  })

  
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    logger.info(`Socket end ${socket.id}`);
  });
});
// USAGE IN CONTROLLERS
// req.socket.server.sockets.emit('message', "this is a test"); - io
// req.socket.emit('message', "this is a test"); - socket

// // send to current request socket client

//  // sending to all clients, include sender
//  io.sockets.emit('message', "this is a test");

//  // sending to all clients except sender
//  socket.broadcast.emit('message', "this is a test");

//  // sending to all clients in 'game' room(channel) except sender
//  socket.broadcast.to('game').emit('message', 'nice game');

//   // sending to all clients in 'game' room(channel), include sender
//  io.sockets.in('game').emit('message', 'cool game');

//  // sending to individual socketid
//  io.sockets.socket(socketid).emit('message', 'for your eyes only');
