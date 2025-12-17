import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const SITEMAP_FILE = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://corax-amsterdam.vercel.app';

// Static routes
const staticRoutes = [
    { url: '/', priority: '1.0', freq: 'daily' },
    { url: '/explore', priority: '0.8', freq: 'daily' },
    { url: '/videos', priority: '0.8', freq: 'weekly' },
    { url: '/insta', priority: '0.8', freq: 'daily' },
    { url: '/support', priority: '0.5', freq: 'monthly' },
    { url: '/guides', priority: '0.9', freq: 'weekly' },
    { url: '/guides/first-time-guide-2026', priority: '0.9', freq: 'monthly' },
    { url: '/guides/best-hash-amsterdam-2026', priority: '0.9', freq: 'monthly' }
];

function extractShops(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const shops = [];
    // Regex to find "id": "123" and "name": "Shop Name" patterns, handling escaped quotes
    const regex = /"id":\s*"((?:[^"\\]|\\.)*)"[\s\S]*?"name":\s*"((?:[^"\\]|\\.)*)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        shops.push({
            id: match[1],
            name: match[2]
        });
    }
    return shops;
}

function toSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function generateSitemap() {
    console.log('Generating sitemap...');

    const shops = extractShops(COFFEESHOPS_FILE);
    console.log(`Found ${shops.length} shops.`);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

    // Add static routes
    staticRoutes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(BASE_URL + route.url)}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>${route.freq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    // Add shop routes
    shops.forEach(shop => {
        const slug = toSlug(shop.name);
        const url = `${BASE_URL}/shop/${encodeURIComponent(shop.id)}/${encodeURIComponent(slug)}`;
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(url)}</loc>\n`;
        xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    fs.writeFileSync(SITEMAP_FILE, xml);
    console.log(`Sitemap written to ${SITEMAP_FILE}`);
}

generateSitemap();
