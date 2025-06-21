const fs = require("fs");
const path = require("path");

module.exports = (articulos) => {
  try {
    if (!Array.isArray(articulos)) {
      throw new Error("Los artículos deben ser un array");
    }

    const csvHeader = "Título,Autor,Fecha,URL\n";
    const csvData = articulos
      .map((art) => `"${art.title || ''}","${art.author || ''}","${art.date || ''}","${art.url || ''}"`)
      .join("\n");

    const dirPath = path.join(__dirname, "../../data");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, "articulos.csv");
    fs.writeFileSync(filePath, csvHeader + csvData, "utf-8");
    console.log(`✅ CSV guardado en: ${filePath}`);
  } catch (error) {
    console.error("❌ Error al exportar CSV:", error.message);
  }
};