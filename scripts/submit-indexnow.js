import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_FILE = path.join(__dirname, '../public/sitemap.xml');

// Extract URLs from sitemap
const sitemapContent = fs.readFileSync(SITEMAP_FILE, 'utf-8');
const urls = [];
const regex = /<loc>(.*?)<\/loc>/g;
let match;
while ((match = regex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs to submit.`);

const data = JSON.stringify({
    "host": "corax-amsterdam-explorer-main.pages.dev",
    "key": "32065eec00e84b769f8d272cd65be47a",
    "keyLocation": "https://corax-amsterdam-explorer-main.pages.dev/32065eec00e84b769f8d272cd65be47a.txt",
    "urlList": urls
});

const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
