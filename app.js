const scraper = require('./src/js/scraper');
const exportarJSON = require('./src/js/exportarJSON');
const exportarCSV = require('./src/js/exportarCSV');
const exportarExcel = require('./src/js/exportarExcel');
const exportarTXT = require('./src/js/exportarTXT');
const exportarPDF = require('./src/js/exportarPDF');

(async () => {
    const articulos = await scraper();

    exportarJSON(articulos);
    exportarCSV(articulos);
    exportarExcel(articulos);
    exportarTXT(articulos);
    exportarPDF(articulos);
})();
