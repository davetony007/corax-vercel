import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const MENUS_DIR = path.join(__dirname, '../public/menus');
const BASE_URL = 'https://www.coffeeshopmenus.org/';

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

function parseDate(dateText) {
    // dateText e.g. "28 November" or "28 November 2025"
    // console.log(`Parsing date text: "${dateText}"`);

    const months = {
        'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
        'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11,
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
    };

    const cleanText = dateText.trim().replace(/,/g, '').replace(/\s+/g, ' ');
    const parts = cleanText.split(' ');

    // Expect at least "Day Month" (2 parts)
    if (parts.length < 2) {
        // console.warn(`Date text too short: "${dateText}"`);
        return null;
    }

    const day = parseInt(parts[0]);
    const monthStr = parts[1].toLowerCase();
    const month = months[monthStr];

    if (isNaN(day) || month === undefined) {
        // console.warn(`Could not parse day/month from: "${dateText}"`);
        return null;
    }

    const now = new Date();
    let year = now.getFullYear();

    // If year is explicitly provided
    if (parts.length >= 3) {
        const parsedYear = parseInt(parts[2]);
        if (!isNaN(parsedYear)) year = parsedYear;
    } else {
        // Infer year
        const date = new Date(year, month, day);
        // If date is more than a month in the future, it's probably last year
        if (date > new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)) {
            year -= 1;
        }
    }

    // Pad with zeros
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const yy = String(year).slice(-2);

    return `${dd}-${mm}-${yy}`;
}

async function scrapeLatestMenus() {
    if (!fs.existsSync(MENUS_DIR)) {
        fs.mkdirSync(MENUS_DIR, { recursive: true });
    }

    const shops = extractData(COFFEESHOPS_FILE);
    console.log(`Found ${shops.length} shops in local data.`);

    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    console.log('Fetching latest menus from coffeeshopmenus.org...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    const latestLinks = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('a[href^="cs-"]'));
        return anchors.map(a => ({
            text: a.innerText.trim(),
            href: a.href
        }));
    });

    console.log(`Found ${latestLinks.length} latest menu links.`);

    let updatedCount = 0;

    for (const link of latestLinks) {
        // Format: "Happy Feelings, Amsterdam\n 28 November\n By Anonymous"
        const lines = link.text.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length < 2) continue;

        const nameLine = lines[0]; // "Happy Feelings, Amsterdam"
        const dateLine = lines[1]; // "28 November"

        const shopName = nameLine.split(',')[0].trim();
        const dateStr = parseDate(dateLine); // "28-11-25"

        if (!dateStr) {
            // console.warn(`Skipping ${shopName} due to invalid date: "${dateLine}"`);
            continue;
        }

        // Find matching shop
        const shop = shops.find(s => s.name.toLowerCase() === shopName.toLowerCase());

        if (!shop) {
            continue;
        }

        console.log(`Found update for ${shop.name} (${dateStr})`);

        try {
            await page.goto(link.href, { waitUntil: 'domcontentloaded' });

            const imageUrl = await page.evaluate(() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                imgs.sort((a, b) => (b.width * b.height) - (a.width * a.height));
                return imgs.length > 0 ? imgs[0].src : null;
            });

            if (imageUrl) {
                // Normalize name with hyphens to match existing convention
                const normalizedShopName = shop.name.replace(/[^a-z0-9]/gi, '-').toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
                const filenameBase = `${normalizedShopName}-${dateStr}`;

                // Check for existing files with any extension
                const existingFiles = fs.readdirSync(MENUS_DIR);
                const duplicate = existingFiles.find(f => f.startsWith(filenameBase));

                if (duplicate) {
                    console.log(`Skipping ${shop.name} (${dateStr}): ${duplicate} already exists.`);
                    continue;
                }

                const filename = `${filenameBase}.jpg`;
                const filepath = path.join(MENUS_DIR, filename);
                const publicPath = `/menus/${filename}`;

                await downloadImage(imageUrl, filepath);
                console.log(`Downloaded menu for ${shop.name} to ${filename}`);

                // Update shop data
                if (!shop.menuImages) {
                    shop.menuImages = [];
                }
                // Add to beginning if not exists
                // Check if we already have this specific file or a file with the same base name in the list
                // (Though the file check above handles the download, we should also check the array to be safe)
                const alreadyLinked = shop.menuImages.some(img => img.includes(filenameBase));
                if (!alreadyLinked) {
                    shop.menuImages.unshift(publicPath);
                    updatedCount++;
                }
            }
        } catch (e) {
            console.error(`Failed to process ${shop.name}: ${e.message}`);
        }
    }

    await browser.close();

    if (updatedCount > 0) {
        console.log(`Updating ${updatedCount} shops with new menus...`);

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

scrapeLatestMenus().catch(console.error);
