const fileTypes = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  TEXT: 'TEXT',
  RECALL: 'RECALL',
  LIKE: 'LIKE',
  LOVE: 'LOVE',
  DOWNLOAD: 'DOWNLOAD',
  CALL: 'CALL',
  ANSWER: 'ANSWER',
};

const files = Object.keys(fileTypes);
module.exports = {
  files,
  fileTypes,
};
