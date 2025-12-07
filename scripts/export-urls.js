import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEOS_FILE = path.join(__dirname, '../src/data/videos.ts');
const SHORTS_FILE = path.join(__dirname, '../src/data/shorts.ts');
const VIDEOS_OUTPUT_FILE = path.join(__dirname, '../youtube_videos.txt');
const SHORTS_OUTPUT_FILE = path.join(__dirname, '../youtube_shorts.txt');

function extractData(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');

    const startIndex = content.indexOf('[');
    const endIndex = content.lastIndexOf(']');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const arrayString = content.substring(startIndex, endIndex + 1);
        try {
            return eval('(' + arrayString + ')');
        } catch (e) {
            console.error(`Failed to parse ${path.basename(filePath)}: ${e.message}`);
            return [];
        }
    }
    return [];
}

async function exportUrls() {
    console.log('Reading data files...');
    const videos = extractData(VIDEOS_FILE);
    const shorts = extractData(SHORTS_FILE);

    console.log(`Found ${videos.length} videos and ${shorts.length} shorts.`);

    const videoUrls = videos.map(v => `https://www.youtube.com/watch?v=${v.videoId}`).join('\n');
    const shortUrls = shorts.map(s => `https://www.youtube.com/watch?v=${s.videoId}`).join('\n');

    fs.writeFileSync(VIDEOS_OUTPUT_FILE, videoUrls);
    console.log(`Successfully wrote ${videos.length} URLs to ${VIDEOS_OUTPUT_FILE}`);

    fs.writeFileSync(SHORTS_OUTPUT_FILE, shortUrls);
    console.log(`Successfully wrote ${shorts.length} URLs to ${SHORTS_OUTPUT_FILE}`);
}

exportUrls().catch(console.error);
