const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

module.exports = async (data) => {
  try {
    const doc = new PDFDocument();
    const dirPath = path.join(__dirname, '../../data');
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, 'articulos.pdf');
    doc.pipe(fs.createWriteStream(filePath));

   
    doc.fontSize(20).text('Reporte de Artículos', { align: 'center' });
    doc.moveDown();

    
    data.forEach((a, index) => {
      doc.fontSize(14).text(`${index + 1}. ${a.title || 'Sin título'}`, { underline: true });
      doc.fontSize(10).text(`Autor: ${a.author || 'Desconocido'}`);
      doc.text(`Fecha: ${a.date || 'N/A'}`);
      doc.text(`URL: ${a.url || 'N/A'}`);
      doc.moveDown();
      
      if (a.summary) {
        doc.fontSize(12).text('Resumen:', { continued: true });
        doc.text(` ${a.summary}`);
      }
      
      doc.moveDown(2);
    });

    doc.end();
    console.log(`✅ PDF generado en: ${filePath}`);
  } catch (error) {
    console.error('❌ Error generando PDF:', error.message);
  }
};