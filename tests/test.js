const { parse } = require('date-format-parse');



// with locale, see locale config below

const a = parse('20-10-2000', 'DD-MM-YYYY');
console.log(a.getFullYear());