const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

module.exports = function (data) {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Articulos');
    xlsx.writeFileSync(path.join(__dirname, '../../data/articulos.xlsx'));
};
