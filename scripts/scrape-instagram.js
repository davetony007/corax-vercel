import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSTAGRAM_FILE = path.join(__dirname, '../src/data/instagram.ts');
const IMAGES_DIR = path.join(__dirname, '../public/images/instagram');
const PROFILE_URL = 'https://www.instagram.com/corax_amsterdam/';

function extractData(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const startMarker = 'export const instagramPosts: InstagramPost[] =';

    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return [];

    let rawPart = content.substring(startIndex);
    const arrayStart = rawPart.indexOf('[');
    const arrayEnd = rawPart.lastIndexOf(']');

    if (arrayStart !== -1 && arrayEnd !== -1) {
        const arrayString = rawPart.substring(arrayStart, arrayEnd + 1);
        try {
            return eval('(' + arrayString + ')');
        } catch (e) {
            console.error(`Failed to parse instagram data: ${e.message}`);
            return [];
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

async function scrapeInstagram() {
    if (!fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    const existingPosts = extractData(INSTAGRAM_FILE);
    const existingUrls = new Set(existingPosts.map(p => p.url));
    console.log(`Loaded ${existingUrls.size} existing posts.`);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log(`Navigating to ${PROFILE_URL}...`);
    await page.goto(PROFILE_URL, { waitUntil: 'networkidle2' });

    // Check for login wall
    // Instagram often blocks non-logged in users after a few scrolls or immediately.
    // Since this is a local script, we can ask the user to login if needed.
    console.log("Please log in if prompted. Script will continue scanning.");

    let newPosts = [];
    let previousHeight = 0;

    // We'll try to scroll a few times or until we hit existing posts
    let attempts = 0;
    const MAX_ATTEMPTS = 10; // Don't scroll forever

    while (attempts < MAX_ATTEMPTS) {
        const posts = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('a'));
            const results = [];

            anchors.forEach(a => {
                const href = a.href;
                if (href.includes('/p/') || href.includes('/reel/')) {
                    // Find image
                    const img = a.querySelector('img');
                    const src = img ? img.src : null;
                    const alt = img ? img.alt : '';

                    if (src) {
                        results.push({
                            url: href.split('?')[0], // Clean URL
                            imageSrc: src,
                            caption: alt
                        });
                    }
                }
            });
            return results;
        });

        let foundExisting = false;
        for (const post of posts) {
            if (existingUrls.has(post.url)) {
                foundExisting = true;
                continue;
            }

            if (!newPosts.find(p => p.url === post.url)) {
                newPosts.push(post);
            }
        }

        if (foundExisting && newPosts.length > 0) {
            console.log("Found overlap with existing data. Stopping.");
            break;
        }

        // Scroll
        previousHeight = await page.evaluate('document.documentElement.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
        await new Promise(r => setTimeout(r, 3000)); // Wait for load

        const newHeight = await page.evaluate('document.documentElement.scrollHeight');
        if (newHeight === previousHeight) {
            console.log("Reached end of page.");
            break;
        }
        attempts++;
    }

    // Process new posts
    if (newPosts.length > 0) {
        console.log(`Found ${newPosts.length} new posts. Processing...`);

        const finalPosts = [];
        for (const post of newPosts) {
            // Download image
            // Extract ID from URL for filename
            // e.g. /p/Code/ -> Code
            const parts = post.url.split('/').filter(p => p);
            const id = parts[parts.length - 1];
            const filename = `${id}.jpg`;
            const filepath = path.join(IMAGES_DIR, filename);
            const publicPath = `/images/instagram/${filename}`;

            try {
                await downloadImage(post.imageSrc, filepath);
                finalPosts.push({
                    url: post.url,
                    image: publicPath,
                    caption: post.caption
                });
                console.log(`Downloaded ${filename}`);
            } catch (e) {
                console.error(`Failed to download image for ${post.url}: ${e.message}`);
            }
        }

        if (finalPosts.length > 0) {
            // Prepend new posts
            const updatedData = [...finalPosts, ...existingPosts];

            const originalContent = fs.readFileSync(INSTAGRAM_FILE, 'utf-8');
            const newArrayString = JSON.stringify(updatedData, null, 2);

            const startMarker = 'export const instagramPosts: InstagramPost[] =';
            const startIndex = originalContent.indexOf(startMarker);

            if (startIndex !== -1) {
                const openBracket = originalContent.indexOf('[', startIndex);
                const closeBracket = originalContent.lastIndexOf(']');

                if (openBracket !== -1 && closeBracket !== -1) {
                    const prefix = originalContent.substring(0, openBracket);
                    const suffix = originalContent.substring(closeBracket + 1);
                    const newContent = `${prefix}${newArrayString}${suffix}`;
                    fs.writeFileSync(INSTAGRAM_FILE, newContent);
                    console.log(`Updated instagram.ts with ${finalPosts.length} new posts.`);
                }
            }
        }
    } else {
        console.log("No new posts found.");
    }

    await browser.close();
}

scrapeInstagram().catch(console.error);
