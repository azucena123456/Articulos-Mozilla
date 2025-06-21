const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

module.exports = function (data) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(path.join(__dirname, '../../data/articulos.pdf')));

    data.forEach(a => {
        doc.fontSize(14).text(`Título: ${a.title}`, { underline: true });
        doc.fontSize(12).text(`Resumen: ${a.summary}`);
        doc.text(`Autor: ${a.author}`);
        doc.text(`Fecha: ${a.date}`);
        doc.text(`URL: ${a.url}`);
        doc.text(`Imagen: ${a.img}`);
        doc.moveDown();
    });

    doc.end();
};
