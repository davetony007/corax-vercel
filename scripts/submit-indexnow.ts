
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'corax-amsterdam.vercel.app';
const KEY = 'd2a8f4fef2844399871c60c335d86c7d';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

interface IndexNowPayload {
    host: string;
    key: string;
    keyLocation: string;
    urlList: string[];
}

function getUrlsFromSitemap(): string[] {
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error(`Error: Sitemap not found at ${SITEMAP_PATH}. Please run 'npm run build' first.`);
        process.exit(1);
    }

    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const urls: string[] = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;

    while ((match = locRegex.exec(sitemapContent)) !== null) {
        urls.push(match[1]);
    }

    return urls;
}

function submitToIndexNow(payload: IndexNowPayload) {
    const data = JSON.stringify(payload);
    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/IndexNow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length,
            'Host': 'api.indexnow.org'
        }
    };

    const req = https.request(options, (res) => {
        console.log(`Status Code: ${res.statusCode}`);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });

    req.on('error', (error) => {
        console.error('Error submitting to IndexNow:', error);
    });

    req.write(data);
    req.end();
}

function main() {
    console.log('Extracting URLs from sitemap...');
    const urlList = getUrlsFromSitemap();

    if (urlList.length === 0) {
        console.error('No URLs found in sitemap.');
        return;
    }

    console.log(`Found ${urlList.length} URLs.`);

    const payload: IndexNowPayload = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlList
    };

    console.log('Submitting to IndexNow...');
    submitToIndexNow(payload);
}

main();
