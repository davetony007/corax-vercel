import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILES = [
    path.join(__dirname, '../youtube-data.json'),
    path.join(__dirname, '../youtube-data-videos.json'),
    path.join(__dirname, '../youtube-data-shorts.json')
];
const VIDEOS_TS_FILE = path.join(__dirname, '../src/data/videos.ts');
const SHORTS_TS_FILE = path.join(__dirname, '../src/data/shorts.ts');

async function updateYouTube() {
    // Find the first existing data file
    const dataFile = DATA_FILES.find(f => fs.existsSync(f));

    if (!dataFile) {
        console.error('Error: No data file found. Please save as youtube-data.json, youtube-data-videos.json, or youtube-data-shorts.json');
        process.exit(1);
    }

    console.log(`Reading data from ${path.basename(dataFile)}...`);
    const rawData = fs.readFileSync(dataFile, 'utf-8');
    const scrapedItems = JSON.parse(rawData);

    if (scrapedItems.length === 0) {
        console.log('No items found in data file.');
        return;
    }

    // Detect type based on the first item
    const isShorts = scrapedItems[0].type === 'short';
    const targetFile = isShorts ? SHORTS_TS_FILE : VIDEOS_TS_FILE;
    const typeName = isShorts ? 'Shorts' : 'Videos';

    console.log(`Processing ${scrapedItems.length} new ${typeName}...`);

    // 1. Read existing data
    let existingItems = [];
    if (fs.existsSync(targetFile)) {
        const fileContent = fs.readFileSync(targetFile, 'utf-8');
        // Regex to extract the JSON array from the TypeScript file
        // Matches: export const variableName: Type[] = [...];
        const match = fileContent.match(/=\s*(\[\s*[\s\S]*?\]);\s*$/);
        if (match && match[1]) {
            try {
                existingItems = JSON.parse(match[1]);
                console.log(`Found ${existingItems.length} existing ${typeName}.`);
            } catch (e) {
                console.warn(`Warning: Could not parse existing ${typeName}. Starting fresh. Error: ${e.message}`);
            }
        }
    }

    // 2. Merge and Deduplicate
    // Create a map of existing items by videoId for quick lookup
    const existingMap = new Map(existingItems.map(item => [item.videoId, item]));

    let newCount = 0;

    const newItemsToAdd = [];

    for (const item of scrapedItems) {
        // Strict type check to prevent pollution
        if ((isShorts && item.type !== 'short') || (!isShorts && item.type !== 'video')) {
            continue;
        }

        if (!existingMap.has(item.videoId)) {
            newItemsToAdd.push({
                id: '', // Will generate ID later
                videoId: item.videoId,
                title: item.title,
                description: item.title // Default description
            });
            newCount++;
        }
    }

    // Prepend new items (so they appear first/newest)
    const finalList = [...newItemsToAdd, ...existingItems];

    // Re-index IDs to ensure consistency (v1, v2, v3...)
    const reindexedList = finalList.map((item, index) => ({
        ...item,
        id: isShorts ? `s${index + 1}` : `${index + 1}`
    }));

    console.log(`Added ${newCount} new ${typeName}. Total: ${reindexedList.length}.`);

    // 3. Generate TypeScript content
    let tsContent = '';

    if (isShorts) {
        tsContent = `export interface ShortData {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail?: string;
}

// YouTube Shorts (${reindexedList.length} total)
export const shorts: ShortData[] = ${JSON.stringify(reindexedList, null, 2)};
`;
    } else {
        tsContent = `export interface VideoData {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail?: string;
}

// Long-form Videos (${reindexedList.length} total)
export const videos: VideoData[] = ${JSON.stringify(reindexedList, null, 2)};
`;
    }

    fs.writeFileSync(targetFile, tsContent);
    console.log(`Successfully updated ${targetFile}`);
}

updateYouTube().catch(console.error);
