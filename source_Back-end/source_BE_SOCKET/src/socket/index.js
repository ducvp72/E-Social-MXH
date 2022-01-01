const socketio = require('socket.io');
const http = require('http');
const https = require('https');
const app = require('../app');
const logger = require('../config/logger');
const config = require('../config/config');
const auth = require('../middlewares/auth');

const error = 'Not found';

const server = http.Server(app);
// prevent heroku sleep
setInterval(() => {
  https.get('https://mxhld.herokuapp.com');
  https.get('https://socket-mxhld.herokuapp.com');
}, 30000);
server.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});
let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    socketId = [socketId];
    users.push({
      userId,
      socketId,
    });
  } else {
    for (i of users) {
      if (i.userId == userId) i.socketId.push(socketId);
    }
  }
};

const removeUser = (socketId) => {
  // users = users.filter((user) => user.socketId !== socketId);
  for (i of users) {
    for (j of i.socketId) if (j == socketId) users = users.filter((user) => user.socketId !== i.socketId);
  }
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const io = socketio(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5500', 'https://vn-mxh.surge.sh'],
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
    try {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
        messageId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });

  socket.on('sendMedia', ({ senderId, receiverId, typeMessage, text, file, messageId }) => {
    const user = getUser(receiverId);
    try {
      io.to(user.socketId).emit('getMedia', {
        senderId,
        typeMessage,
        text,
        file,
        messageId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('sendIcon', ({ senderId, receiverId, typeMessage, messageId }) => {
    const user = getUser(receiverId);
    try {
      io.to(user.socketId).emit('getIcon', {
        senderId,
        typeMessage,
        messageId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('sendRecall', ({ senderId, receiverId, messageId }) => {
    const user = getUser(receiverId);
    try {
      io.to(user.socketId).emit('getRecall', {
        senderId,
        messageId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('online', ({ users }) => {
    const listOnline = [];
    try {
      if (typeof users === 'object') {
        for (const user of users) {
          const u = getUser(user);
          if (u) listOnline.push(true);
          else listOnline.push(false);
        }
        socket.emit('online', listOnline);
      }
    } catch (err) {
      socket.emit('error', error);
    }

    // eslint-disable-next-line no-restricted-syntax
  });
  socket.on('upload', ({ senderId, receiverId, percent }) => {
    const user = getUser(receiverId);
    try {
      io.to(user.socketId).emit('upload', {
        senderId,
        percent,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('typing', ({ senderId, receiverId }) => {
    try {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('typing', {
        senderId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('untyping', ({ senderId, receiverId }) => {
    try {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('untyping', {
        senderId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('send-file', ({ senderId, receiverId }) => {
    try {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('send-file', {
        senderId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('unsend-file', ({ senderId, receiverId }) => {
    try {
      const user = getUser(receiverId);
      io.to(user.socketId).emit('unsend-file', {
        senderId,
      });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('callUser', ({ userIdToCall, signalData, from }) => {
    const user = getUser(userIdToCall);
    try {
      io.to(user.socketId).emit('callUser', { signal: signalData, from });
    } catch (err) {
      socket.emit('error', error);
    }
  });

  socket.on('answerCall', (data) => {
    const user = getUser(data.to);
    try {
      io.to(user.socketId).emit('callAccepted', data.signal);
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('sendRecall', ({ senderId, receiverId, messageId, index }) => {
    const user = getUser(receiverId);
    try {
      io.to(user.socketId).emit('getRecall', { senderId, messageId, index });
    } catch (err) {
      socket.emit('error', error);
    }
  });
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    logger.info(`Socket end ${socket.id}`);
    socket.broadcast.emit('callEnded');
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
