const Filter = require('bad-words');

const wordFilter = new Filter({ list: ['dmm', 'vcl', 'dm', 'đéo', 'đĩ', 'đỉ', 'tao', 'mày', 'dcm'] });

module.exports = wordFilter;
