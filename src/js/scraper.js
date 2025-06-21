const puppeteer = require('puppeteer');

module.exports = async function getArticlesFromRSS() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto('https://hacks.mozilla.org/', {
            timeout: 60000,
            waitUntil: 'load'
        });

        await page.waitForSelector('ul.article-list > li');

        const articulos = await page.evaluate(() => {
            const posts = document.querySelectorAll('ul.article-list > li');
            const data = [];

            posts.forEach(post => {
                data.push({
                    title: post.querySelector('h3.post_title')?.innerText.trim() || '',
                    summary: post.querySelector('p.post_tease')?.innerText.trim() || '',
                    author: post.querySelector('img')?.alt?.replace(' Photo', '') || 'Desconocido',
                    date: post.querySelector('abbr.published')?.title || '',
                    url: post.querySelector('a')?.href || '',
                    image: post.querySelector('img')?.src || ''
                });
            });

            return data;
        });

        console.log(`✅ Se extrajeron ${articulos.length} artículos`);
        return articulos;
        
    } catch (error) {
        console.error("Error al obtener los artículos:", error.message);
        return []; 
    } finally {
        await browser.close();
    }
}