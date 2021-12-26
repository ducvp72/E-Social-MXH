const fileTypes = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  TEXT: 'TEXT',
<<<<<<< HEAD:source_BE/src/config/file.js
  RECALL: 'RECALL',
  LIKE: 'LIKE',
  LOVE: 'LOVE',
=======
  RECALL:'RECALL',
>>>>>>> BE_SOCKET:source_BE_SOCKET/src/config/file.js
};

const files = Object.keys(fileTypes);
module.exports = {
  files,
  fileTypes,
};
