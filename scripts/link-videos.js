import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const VIDEOS_FILE = path.join(__dirname, '../src/data/videos.ts');
const SHORTS_FILE = path.join(__dirname, '../src/data/shorts.ts');

function extractData(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);

    let arrayString = '';

    if (filename === 'coffeeshops.ts') {
        // Specific logic for coffeeshops.ts which has multiple exports
        const startMarker = 'export const coffeeshops: CoffeeshopData[] =';
        const endMarker = 'export const filterTags';

        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker);

        if (startIndex !== -1 && endIndex !== -1) {
            // Get the part between the markers
            let rawPart = content.substring(startIndex + startMarker.length, endIndex);
            // Find the first '['
            const arrayStart = rawPart.indexOf('[');
            // Find the last ']'
            const arrayEnd = rawPart.lastIndexOf(']');

            if (arrayStart !== -1 && arrayEnd !== -1) {
                arrayString = rawPart.substring(arrayStart, arrayEnd + 1);
            }
        }
    } else {
        // Fallback for videos.ts and shorts.ts (single export)
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

async function linkVideos() {
    console.log('Reading data files...');
    const shops = extractData(COFFEESHOPS_FILE);
    const videos = extractData(VIDEOS_FILE);
    const shorts = extractData(SHORTS_FILE);

    if (shops.length === 0) {
        console.error('No coffeeshops found.');
        return;
    }

    console.log(`Found ${shops.length} shops, ${videos.length} videos, ${shorts.length} shorts.`);

    let updatedCount = 0;

    shops.forEach(shop => {
        const originalVideoCount = shop.videoIds.length;
        const originalShortCount = shop.shortIds.length;

        // Find videos featuring this shop
        const foundVideos = videos.filter(v =>
            v.title.toLowerCase().includes(shop.name.toLowerCase()) ||
            v.description.toLowerCase().includes(shop.name.toLowerCase())
        ).map(v => v.videoId);

        // Find shorts featuring this shop
        const foundShorts = shorts.filter(s =>
            s.title.toLowerCase().includes(shop.name.toLowerCase()) ||
            s.description.toLowerCase().includes(shop.name.toLowerCase())
        ).map(s => s.videoId);

        // Merge with existing IDs (deduplicate)
        const uniqueVideoIds = [...new Set([...shop.videoIds, ...foundVideos])];
        const uniqueShortIds = [...new Set([...shop.shortIds, ...foundShorts])];

        shop.videoIds = uniqueVideoIds;
        shop.shortIds = uniqueShortIds;

        if (shop.videoIds.length !== originalVideoCount || shop.shortIds.length !== originalShortCount) {
            updatedCount++;
            console.log(`Updated ${shop.name}: ${shop.videoIds.length} videos (+${shop.videoIds.length - originalVideoCount}), ${shop.shortIds.length} shorts (+${shop.shortIds.length - originalShortCount})`);
        }
    });

    if (updatedCount === 0) {
        console.log('No new links found.');
        return;
    }

    console.log(`Updating ${updatedCount} shops with new links...`);

    // Reconstruct coffeeshops.ts
    // We need to preserve the interfaces and imports. 
    // We'll read the original file and replace the array part.
    const originalContent = fs.readFileSync(COFFEESHOPS_FILE, 'utf-8');
    const newArrayString = JSON.stringify(shops, null, 2);

    // We need to replace specifically the coffeeshops array part
    // We can use the same logic as extraction to find the range to replace
    const startMarker = 'export const coffeeshops: CoffeeshopData[] =';
    const endMarker = 'export const filterTags';

    const startIndex = originalContent.indexOf(startMarker);
    const endIndex = originalContent.indexOf(endMarker);

    if (startIndex !== -1 && endIndex !== -1) {
        const prefix = originalContent.substring(0, startIndex + startMarker.length);
        const suffix = originalContent.substring(endIndex);

        // We need to make sure we don't lose the whitespace/newlines around the array if possible, 
        // but JSON.stringify will be minified or standard formatted.
        // Let's just put it in.
        const newContent = `${prefix} ${newArrayString};\n\n${suffix}`;

        fs.writeFileSync(COFFEESHOPS_FILE, newContent);
        console.log('Successfully updated coffeeshops.ts');
    } else {
        console.error('Could not find insertion point in coffeeshops.ts');
    }
}

linkVideos().catch(console.error);
