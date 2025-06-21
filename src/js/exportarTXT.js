const fs = require('fs');
const path = require('path');

module.exports = function (data) {
    const texto = data.map(a => (
        `Título: ${a.title}\nResumen: ${a.summary}\nAutor: ${a.author}\nFecha: ${a.date}\nURL: ${a.url}\nImagen: ${a.img}\n\n`
    )).join('');
    fs.writeFileSync(path.join(__dirname, '../../data/articulos.txt'), texto, 'utf-8');
};
