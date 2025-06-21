const Parser = require("rss-parser");
const axios = require("axios");
const cheerio = require("cheerio");


const parser = new Parser({ timeout: 15000 });

function extractImageFromContent(content) {
  if (!content) return null;
  const match = content.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

async function getArticlesFromRSS() {
  try {
    const feed = await parser.parseURL("https://hacks.mozilla.org/feed/");
    console.log(`📌 Artículos en el feed RSS: ${feed.items.length}`);
    
    return feed.items.map(item => ({
      title: item.title || "Sin título",
      summary: item.contentSnippet || "Sin resumen",
      author: item.creator || item.author || "Desconocido",
      date: item.isoDate || new Date().toISOString(),
      url: item.link || "#",
      image: extractImageFromContent(item["content:encoded"] || item.content || ""),
    }));
  } catch (error) {
    console.error("❌ Error al obtener el RSS:", error.message);
    return [];
  }
}


async function scrapeMozillaArticles() {
  try {
    const { data } = await axios.get("https://hacks.mozilla.org", { timeout: 15000 });
    const $ = cheerio.load(data);
    const articles = [];
    
    $(".post-card").each((i, el) => {
      articles.push({
        title: $(el).find("h2").text().trim(),
        summary: $(el).find(".post-card-excerpt").text().trim() || "Sin resumen",
        author: $(el).find(".post-card-author").text().trim() || "Desconocido",
        date: $(el).find("time").attr("datetime") || new Date().toISOString(),
        url: $(el).find("a").attr("href") || "#",
        image: $(el).find("img").attr("src") || null,
      });
    });
    
    console.log(`📌 Artículos extraídos (scraping): ${articles.length}`);
    return articles;
  } catch (error) {
    console.error("❌ Error en scraping:", error.message);
    return [];
  }
}


module.exports = getArticlesFromRSS; 