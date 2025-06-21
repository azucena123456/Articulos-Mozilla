const fs = require('fs');
const path = require('path');

module.exports = (data) => {
  try {
    if (!data) throw new Error("No hay datos para exportar");

    const dirPath = path.join(__dirname, '../../data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, 'articulos.json');
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        metadata: {
          fechaGeneracion: new Date().toISOString(),
          totalArticulos: data.length
        },
        articulos: data
      }, null, 2),
      'utf-8'
    );
    console.log(`✅ JSON guardado en: ${filePath}`);
  } catch (error) {
    console.error('❌ Error exportando JSON:', error.message);
  }
};