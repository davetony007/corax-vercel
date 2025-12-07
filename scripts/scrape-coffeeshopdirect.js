import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const IMAGES_DIR = path.join(__dirname, '../public/images/shops');
const BASE_URL = 'https://www.coffeeshopdirect.com/';

function extractData(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const startMarker = 'export const coffeeshops: CoffeeshopData[] =';
    const endMarker = 'export const filterTags';

    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);

    if (startIndex !== -1 && endIndex !== -1) {
        let rawPart = content.substring(startIndex + startMarker.length, endIndex);
        const arrayStart = rawPart.indexOf('[');
        const arrayEnd = rawPart.lastIndexOf(']');

        if (arrayStart !== -1 && arrayEnd !== -1) {
            const arrayString = rawPart.substring(arrayStart, arrayEnd + 1);
            try {
                return eval('(' + arrayString + ')');
            } catch (e) {
                console.error(`Failed to parse data: ${e.message}`);
                return [];
            }
        }
    }
    return [];
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(new Error(`Failed to download image: Status Code ${res.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
}

async function scrapeCoffeeshopDirect() {
    if (!fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    const shops = extractData(COFFEESHOPS_FILE);
    console.log(`Found ${shops.length} shops in local data.`);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    // Step 1: Build Directory Map
    console.log('Building directory map from coffeeshopdirect.com...');
    const directory = new Map(); // Name -> URL (relative)

    const indices = ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (const char of indices) {
        const url = `${BASE_URL}alpha${char}.html`;
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            const links = await page.evaluate(() => {
                const anchors = Array.from(document.querySelectorAll('a'));
                return anchors.map(a => ({
                    text: a.innerText.trim(),
                    href: a.getAttribute('href')
                })).filter(link => link.href && link.href.endsWith('.html') && !link.href.includes('alpha'));
            });

            links.forEach(link => {
                if (link.text) {
                    directory.set(link.text.toLowerCase(), link.href);
                }
            });
            // console.log(`Indexed ${char}: ${links.length} links`);
        } catch (e) {
            console.error(`Failed to index ${char}: ${e.message}`);
        }
    }
    console.log(`Directory built with ${directory.size} entries.`);

    // Step 2: Match and Scrape
    let updatedCount = 0;

    for (const shop of shops) {
        const imageFilename = `${shop.id}.jpg`;
        const imagePath = path.join(IMAGES_DIR, imageFilename);
        const publicPath = `/images/shops/${imageFilename}`;

        // Skip if we already have a JPG image (not an SVG placeholder or default)
        // Actually, let's overwrite SVGs with real photos if found
        if (fs.existsSync(imagePath)) {
            if (shop.image !== publicPath) {
                shop.image = publicPath;
                updatedCount++;
            }
            continue;
        }

        // Find match
        const shopName = shop.name.toLowerCase();
        let matchUrl = directory.get(shopName);

        // Fuzzy match attempts
        if (!matchUrl) {
            // Try removing "coffeeshop"
            const cleanName = shopName.replace(/coffee\s*shop/g, '').trim();
            matchUrl = directory.get(cleanName);

            if (!matchUrl) {
                // Try finding key that includes cleanName
                for (const [key, url] of directory.entries()) {
                    if (key.includes(cleanName) || cleanName.includes(key)) {
                        matchUrl = url;
                        break;
                    }
                }
            }
        }

        if (!matchUrl) {
            console.warn(`No match found for ${shop.name}`);
            continue;
        }

        console.log(`Matched ${shop.name} -> ${matchUrl}`);

        // Construct Pics URL
        // Usually [Name].html -> [Name]_pics.html
        // But sometimes the link in directory is already to a subfolder or different name?
        // Let's assume the directory link is the main page.
        // We need to check if there is a link to "Pictures" or "More Pictures" on that page, 
        // OR just try to guess the _pics URL.

        try {
            const shopPageUrl = new URL(matchUrl, BASE_URL).href;
            await page.goto(shopPageUrl, { waitUntil: 'domcontentloaded' });

            // Look for a link containing "pics" or "pictures"
            let picsHref = await page.evaluate(() => {
                const anchors = Array.from(document.querySelectorAll('a'));
                const picLink = anchors.find(a => a.href.includes('_pics') || a.innerText.toLowerCase().includes('picture'));
                return picLink ? picLink.href : null;
            });

            // Fallback: Try to construct it
            if (!picsHref) {
                const basename = matchUrl.replace('.html', '');
                picsHref = new URL(`${basename}_pics.html`, BASE_URL).href;
            }

            // Visit Pics Page
            await page.goto(picsHref, { waitUntil: 'domcontentloaded' });

            // Find first image that looks like a shop photo
            const imageUrl = await page.evaluate(() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                // Filter out small icons, navigation images, etc.
                // Look for images with 'pics' in src or substantial size
                const mainImg = imgs.find(img => img.src.includes('_pics') || (img.width > 200 && img.height > 150));
                return mainImg ? mainImg.src : null;
            });

            if (imageUrl) {
                await downloadImage(imageUrl, imagePath);
                console.log(`Downloaded image for ${shop.name}`);
                shop.image = publicPath;
                updatedCount++;
            } else {
                console.warn(`No image found on pics page for ${shop.name}`);
            }

            // Be nice
            await new Promise(r => setTimeout(r, 500));

        } catch (e) {
            console.error(`Failed to scrape ${shop.name}: ${e.message}`);
        }
    }

    await browser.close();

    if (updatedCount > 0) {
        console.log(`Updating ${updatedCount} shops with new image paths...`);

        const originalContent = fs.readFileSync(COFFEESHOPS_FILE, 'utf-8');
        const newArrayString = JSON.stringify(shops, null, 2);

        const startMarker = 'export const coffeeshops: CoffeeshopData[] =';
        const endMarker = 'export const filterTags';

        const startIndex = originalContent.indexOf(startMarker);
        const endIndex = originalContent.indexOf(endMarker);

        if (startIndex !== -1 && endIndex !== -1) {
            const prefix = originalContent.substring(0, startIndex + startMarker.length);
            const suffix = originalContent.substring(endIndex);
            const newContent = `${prefix} ${newArrayString};\n\n${suffix}`;
            fs.writeFileSync(COFFEESHOPS_FILE, newContent);
            console.log('Successfully updated coffeeshops.ts');
        }
    } else {
        console.log('No changes made to coffeeshops.ts');
    }
}

scrapeCoffeeshopDirect().catch(console.error);
