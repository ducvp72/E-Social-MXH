const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./config/logger');
<<<<<<< HEAD:source_Back-end/source_BE/src/index.js
const app = require('./app');
=======
require('./socket');
>>>>>>> origin/BE_SOCKET:source_BE_SOCKET/src/index.js

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
<<<<<<< HEAD:source_Back-end/source_BE/src/index.js

=======
>>>>>>> origin/BE_SOCKET:source_BE_SOCKET/src/index.js
