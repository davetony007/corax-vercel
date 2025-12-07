import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '../instagram-data.json');
const HISTORY_FILE = path.join(__dirname, '../.instagram-history.json');
const OUTPUT_TS_FILE = path.join(__dirname, '../src/data/instagram.ts');
const IMAGE_DIR = path.join(__dirname, '../public/images/instagram');

// Ensure image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Helper to read JSON safely
const readJson = (filepath) => {
    if (fs.existsSync(filepath)) {
        try {
            const data = fs.readFileSync(filepath, 'utf8');
            return JSON.parse(data);
        } catch (e) {
            console.warn(`Warning: Could not parse ${path.basename(filepath)}: ${e.message}`);
        }
    }
    return [];
};

// Helper to read existing TS file (for initialization)
const readExistingTs = (filepath) => {
    if (fs.existsSync(filepath)) {
        try {
            const content = fs.readFileSync(filepath, 'utf8');
            const match = content.match(/export const instagramPosts: InstagramPost\[\] = (\[[\s\S]*?\]);/);
            if (match && match[1]) {
                return JSON.parse(match[1]);
            }
        } catch (e) {
            console.warn(`Warning: Could not parse existing TS file: ${e.message}`);
        }
    }
    return [];
};

// Helper to download image
const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download image: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

async function updateInstagram() {
    console.log('Starting Instagram update...');

    // 1. Load History
    let history = [];
    if (fs.existsSync(HISTORY_FILE)) {
        history = readJson(HISTORY_FILE);
        console.log(`Loaded ${history.length} posts from history.`);
    } else {
        console.log('History file not found. Initializing from existing TypeScript file...');
        history = readExistingTs(OUTPUT_TS_FILE);
        console.log(`Initialized history with ${history.length} posts from ${path.basename(OUTPUT_TS_FILE)}`);
        // Save immediately to establish history
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    }

    // 2. Load New Data (Inbox)
    // Check if DATA_FILE exists, if not, just warn but don't fail if we have history
    let newPostsRaw = [];
    if (fs.existsSync(DATA_FILE)) {
        newPostsRaw = readJson(DATA_FILE);
        console.log(`Loaded ${newPostsRaw.length} posts from inbox (${path.basename(DATA_FILE)}).`);
    } else {
        console.log(`Inbox file ${path.basename(DATA_FILE)} not found. Skipping new data import.`);
    }

    // 3. Filter New Items
    const historyUrls = new Set(history.map(p => p.url));
    const uniqueNewPosts = newPostsRaw.filter(p => !historyUrls.has(p.url));

    if (uniqueNewPosts.length === 0) {
        console.log('No new posts found in inbox.');
    } else {
        console.log(`Found ${uniqueNewPosts.length} NEW posts to process.`);
    }

    // 4. Process New Items
    const processedNewPosts = [];
    for (const post of uniqueNewPosts) {
        if (!post.imageSrc) {
            console.warn(`Skipping post without image source: ${post.url}`);
            continue;
        }

        // Generate filename from URL ID (last part of path)
        // e.g. https://www.instagram.com/p/CODE/ -> CODE.jpg
        let id = '';
        try {
            const urlObj = new URL(post.url);
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            id = pathParts[pathParts.length - 1];
        } catch (e) {
            // Fallback if URL parsing fails
            id = Math.random().toString(36).substring(7);
        }

        if (!id) id = Math.random().toString(36).substring(7);

        const filename = `${id}.jpg`;
        const localImagePath = path.join(IMAGE_DIR, filename);
        const publicImagePath = `/images/instagram/${filename}`;

        try {
            console.log(`Downloading image for ${id}...`);
            await downloadImage(post.imageSrc, localImagePath);

            processedNewPosts.push({
                url: post.url,
                image: publicImagePath,
                caption: post.caption || ''
            });
        } catch (e) {
            console.error(`Failed to download image for ${post.url}: ${e.message}`);
        }
    }

    // 5. Update History (Prepend new posts)
    const updatedHistory = [...processedNewPosts, ...history];

    // 6. Save History
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(updatedHistory, null, 2));
    console.log(`Updated history saved. Total items: ${updatedHistory.length}`);

    // 7. Write TS
    const tsContent = `export interface InstagramPost {
  url: string;
  image?: string;
  caption?: string;
}

export const instagramPosts: InstagramPost[] = ${JSON.stringify(updatedHistory, null, 2)};
`;
    fs.writeFileSync(OUTPUT_TS_FILE, tsContent);
    console.log(`Updated ${path.basename(OUTPUT_TS_FILE)}`);
}

updateInstagram();
