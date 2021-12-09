const socketio = require('socket.io');
const http = require('http');
const app = require('../app');
const logger = require('../config/logger');
const config = require('../config/config');
const auth = require('../middlewares/auth');

const server = http.Server(app);
server.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({
      userId,
      socketId,
    });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const io = socketio(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5500', 'http://vn-mxh.surge.sh/'],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  },
});

const wrapMiddlewareForSocketIo = (middleware) => (socket, next) => middleware(socket.request, {}, next);
io.use(wrapMiddlewareForSocketIo(auth('')));
io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  logger.info(`Socket connection: ${socket.id}`);

  addUser(socket.request.user.id, socket.id);
  socket.on('whoami', (cb) => {
    cb(socket.request.user);
  });
  socket.on('radio', function (blob) {
    // can choose to broadcast it to whoever you want
    socket.broadcast.emit('voice', blob);
  });

  // send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text, messageId }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
        messageId,
      });
    }
  });
  socket.on('sendMedia', ({ senderId, receiverId, typeMessage, text, file, messageId }) => {
    if (senderId && receiverId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('getMedia', {
        senderId,
        typeMessage,
        text,
        file,
        messageId,
      });
    }
  });
  socket.on('sendIcon', ({ senderId, receiverId, typeMessage, messageId }) => {
    if (senderId && receiverId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('getIcon', {
        senderId,
        typeMessage,
        messageId,
      });
    }
  });
  socket.on('sendRecall', ({ senderId, receiverId, messageId }) => {
    if (senderId && receiverId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('getRecall', {
        senderId,
        messageId,
      });
    }
  });
  socket.on('online', ({ users }) => {
    const listOnline = [];
    if (typeof users === 'object') {
      for (const user of users) {
        const u = getUser(user);
        if (u) listOnline.push(true);
        else listOnline.push(false);
      }
      socket.emit('online', listOnline);
    }
    // eslint-disable-next-line no-restricted-syntax
  });
  socket.on('upload', ({ senderId, receiverId, percent }) => {
    if (senderId && receiverId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('upload', {
        senderId,
        percent,
      });
    }
  });
  socket.on('typing', ({ senderId, receiverId }) => {
    if (receiverId && senderId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('typing', { senderId });
    }
  });
  socket.on('untyping', ({ senderId, receiverId }) => {
    if (receiverId && senderId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('untyping', { senderId });
    }
  });
  socket.on('send-file', ({ senderId, receiverId }) => {
    if (receiverId && senderId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('send-file', { senderId });
    }
  });
  socket.on('unsend-file', ({ senderId, receiverId }) => {
    if (receiverId && senderId) {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('unsend-file', { senderId });
    }
  });
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    logger.info(`Socket end ${socket.id}`);
    removeUser(socket.id);
  });
});
// take userId and socketId from user

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
