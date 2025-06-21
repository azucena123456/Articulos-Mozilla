const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

module.exports = (articulos) => {
  try {
   
    const dirPath = path.join(__dirname, "../../data");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

 
    const worksheet = XLSX.utils.json_to_sheet(articulos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Artículos");


    const filePath = path.join(dirPath, "articulos.xlsx");
    XLSX.writeFile(workbook, filePath);
    console.log("✅ Archivo Excel guardado en:", filePath);
  } catch (error) {
    console.error("❌ Error al exportar a Excel:", error.message);
  }
};