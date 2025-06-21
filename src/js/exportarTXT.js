const fs = require('fs');
const path = require('path');

module.exports = (data) => {
  try {
    if (!Array.isArray(data)) throw new Error("Datos inválidos");

    const texto = data.map(a => `
=== Artículo ===
Título: ${a.title || 'N/A'}
Resumen: ${a.summary || 'N/A'}
Autor: ${a.author || 'N/A'}
Fecha: ${a.date || 'N/A'}
URL: ${a.url || 'N/A'}
Imagen: ${a.img || 'N/A'}
`).join('\n');

    const dirPath = path.join(__dirname, '../../data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(
      path.join(dirPath, 'articulos.txt'),
      `Total artículos: ${data.length}\n${texto}`,
      'utf-8'
    );
    console.log('✅ TXT exportado correctamente');
  } catch (error) {
    console.error('❌ Error exportando TXT:', error.message);
  }
};