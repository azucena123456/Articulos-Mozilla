const fs = require('fs');
const { Parser } = require('json2csv');
const path = require('path');

module.exports = function (data) {
    const parser = new Parser();
    const csv = parser.parse(data);
    fs.writeFileSync(path.join(__dirname, '../../data/articulos.csv'), csv, 'utf-8');
};
