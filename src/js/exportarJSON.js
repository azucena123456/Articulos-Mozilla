const fs = require('fs');
const path = require('path');

module.exports = function (data) {
    fs.writeFileSync(path.join(__dirname, '../../data/articulos.json'), JSON.stringify(data, null, 2), 'utf-8');
};
