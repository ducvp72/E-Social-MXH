const fileTypes = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  TEXT: 'TEXT',
  RECALL: 'RECALL',
  LIKE: 'LIKE',
  LOVE: 'LOVE',
  DOWNLOAD: 'DOWNLOAD',
};

const files = Object.keys(fileTypes);
module.exports = {
  files,
  fileTypes,
};
