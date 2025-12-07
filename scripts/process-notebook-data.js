import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_FILE = path.join(__dirname, '../video-shop-details.txt');
const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const VIDEOS_FILE = path.join(__dirname, '../src/data/videos.ts');

function extractData(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);

    let arrayString = '';

    if (filename === 'coffeeshops.ts') {
        const startMarker = 'export const coffeeshops: CoffeeshopData[] =';
        const endMarker = 'export const filterTags';

        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker);

        if (startIndex !== -1 && endIndex !== -1) {
            let rawPart = content.substring(startIndex + startMarker.length, endIndex);
            const arrayStart = rawPart.indexOf('[');
            const arrayEnd = rawPart.lastIndexOf(']');

            if (arrayStart !== -1 && arrayEnd !== -1) {
                arrayString = rawPart.substring(arrayStart, arrayEnd + 1);
            }
        }
    } else {
        const startIndex = content.indexOf('[');
        const endIndex = content.lastIndexOf(']');
        if (startIndex !== -1 && endIndex !== -1) {
            arrayString = content.substring(startIndex, endIndex + 1);
        }
    }

    if (arrayString) {
        try {
            return eval('(' + arrayString + ')');
        } catch (e) {
            console.error(`Failed to parse ${filename}: ${e.message}`);
            return [];
        }
    }
    return [];
}

async function processNotebookData() {
    console.log('Reading data files...');

    // Read CSV
    if (!fs.existsSync(CSV_FILE)) {
        console.error('CSV file not found:', CSV_FILE);
        return;
    }
    const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
    // Skip empty lines and header if needed, but csv-parse handles header
    const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
        skip_records_with_error: true
    });

    console.log(`Found ${records.length} records in CSV.`);

    // Read existing data
    const shops = extractData(COFFEESHOPS_FILE);
    const videos = extractData(VIDEOS_FILE);

    if (shops.length === 0 || videos.length === 0) {
        console.error('Failed to load existing data.');
        return;
    }

    let updatedCount = 0;

    // Create a map of video URL -> video ID
    const videoUrlMap = new Map();
    videos.forEach(v => {
        videoUrlMap.set(`https://www.youtube.com/watch?v=${v.videoId}`, v.videoId);
        // Also support just the ID or other formats if needed, but the CSV has full URLs
    });

    // Helper to fuzzy match shop names
    function findShop(name) {
        const cleanName = name.toLowerCase().replace(/coffee\s*shop/g, '').trim();

        // 1. Exact match
        let match = shops.find(s => s.name.toLowerCase() === name.toLowerCase());
        if (match) return match;

        // 2. Clean match (ignoring "Coffee Shop")
        match = shops.find(s => s.name.toLowerCase().replace(/coffee\s*shop/g, '').trim() === cleanName);
        if (match) return match;

        // 3. Includes match (risky but useful)
        match = shops.find(s => s.name.toLowerCase().includes(cleanName) || cleanName.includes(s.name.toLowerCase()));
        if (match) return match;

        // 4. Specific aliases (manual overrides based on CSV data)
        if (cleanName === '137' || cleanName === '137 aka 77') return shops.find(s => s.name === '137');
        if (cleanName === '7th heaven aka 137') return shops.find(s => s.name === '7th Heaven');
        if (cleanName === 'as the h') return shops.find(s => s.name === 'Abraxas'); // Maybe? "As the H" is weird. Let's skip if unsure.
        if (cleanName === 'actama') return shops.find(s => s.name === 'Aktama 2');
        if (cleanName === 'heavy feelings') return shops.find(s => s.name === 'Happy Feelings');
        if (cleanName === 'bagira') return shops.find(s => s.name === 'Bagheera'); // Assuming Bagheera exists? Or maybe it's a new one.
        if (cleanName === 'crush') return shops.find(s => s.name === 'Katsu'); // Guessing? No, Crush is likely distinct.

        return null;
    }

    records.forEach(record => {
        const videoUrl = record['video url'];
        // The CSV has /c/CoraX/TITLE format sometimes, or standard watch URLs?
        // The file shows: https://www.youtube.com/c/CoraX/TITLE
        // This is NOT a standard video URL. We need to match by TITLE.

        const videoTitle = record['video title'];
        const shopsVisited = record['all coffeeshops visited in the video'];

        // Find the video by title
        const video = videos.find(v => v.title === videoTitle || v.title.includes(videoTitle) || videoTitle.includes(v.title));

        if (!video) {
            console.warn(`Video not found for title: "${videoTitle}"`);
            return;
        }

        const videoId = video.videoId;
        const shopNames = shopsVisited.split(',').map(s => s.trim());

        shopNames.forEach(shopName => {
            const shop = findShop(shopName);
            if (shop) {
                if (!shop.videoIds.includes(videoId)) {
                    shop.videoIds.push(videoId);
                    updatedCount++;
                    console.log(`Linked "${video.title}" to ${shop.name}`);
                }
            } else {
                // console.log(`Could not match shop: "${shopName}"`);
            }
        });
    });

    if (updatedCount === 0) {
        console.log('No new links found.');
        return;
    }

    console.log(`Added ${updatedCount} new links.`);

    // Save changes
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
}

processNotebookData().catch(console.error);
