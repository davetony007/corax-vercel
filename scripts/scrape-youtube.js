import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEOS_FILE = path.join(__dirname, '../src/data/videos.ts');
const SHORTS_FILE = path.join(__dirname, '../src/data/shorts.ts');

// Config
const CHANNEL_URL = 'https://www.youtube.com/@CoraxAmsterdam'; // Hardcoded for convenience

function extractData(filePath, variableName) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const startMarker = `export const ${variableName}`;

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
            console.error(`Failed to parse ${variableName}: ${e.message}`);
            return [];
        }
    }
    return [];
}

async function scrapeTab(page, tabName, existingIds) {
    console.log(`Scraping ${tabName}...`);
    const url = `${CHANNEL_URL}/${tabName}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Accept cookies if needed (simple check)
    try {
        const cookieBtn = await page.$('button[aria-label="Accept all"]');
        if (cookieBtn) await cookieBtn.click();
    } catch (e) { }

    let newItems = [];
    let previousHeight = 0;
    let noNewItemsCount = 0;

    while (true) {
        const items = await page.evaluate((tabName) => {
            const elements = document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer');
            const results = [];

            elements.forEach(el => {
                const link = el.querySelector('a#video-title-link') || el.querySelector('a#video-title');
                if (!link) return;

                const href = link.href;
                let videoId = '';
                if (href.includes('v=')) videoId = href.split('v=')[1].split('&')[0];
                else if (href.includes('/shorts/')) videoId = href.split('/shorts/')[1].split('?')[0];

                if (!videoId) return;

                const title = link.innerText.trim();
                results.push({ videoId, title });
            });
            return results;
        }, tabName);

        // Filter for new items
        let foundExisting = false;
        for (const item of items) {
            if (existingIds.has(item.videoId)) {
                foundExisting = true;
                continue; // We found a known video, so we might be catching up
            }

            // Check if we already added it in this session
            if (!newItems.find(i => i.videoId === item.videoId)) {
                newItems.push(item);
            }
        }

        // If we found existing items, we can probably stop, 
        // BUT YouTube layout is grid, so we might need to check a few more to be sure we got all recent ones.
        // For safety, let's stop if we have found existing items AND we haven't found any NEW items in this scroll.

        if (foundExisting && newItems.length > 0) {
            console.log("Found overlap with existing data. Stopping scrape for this tab.");
            break;
        }

        // Scroll down
        previousHeight = await page.evaluate('document.documentElement.scrollHeight');
        await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
        await new Promise(r => setTimeout(r, 2000)); // Wait for load

        const newHeight = await page.evaluate('document.documentElement.scrollHeight');
        if (newHeight === previousHeight) {
            console.log("Reached end of page.");
            break;
        }
    }

    return newItems;
}

async function updateFile(filePath, variableName, newItems) {
    if (newItems.length === 0) return;

    const currentData = extractData(filePath, variableName);

    // Convert newItems to full objects
    // We need 'id' (incrementing string) and 'description' (placeholder)
    let maxId = 0;
    currentData.forEach(d => {
        const id = parseInt(d.id);
        if (!isNaN(id) && id > maxId) maxId = id;
    });

    const addedData = newItems.map((item, index) => ({
        id: (maxId + newItems.length - index).toString(), // Reverse order so newest is last added? No, usually newest is top.
        // Actually, let's just increment from maxId
        // But wait, if we prepend, we might want to re-id? 
        // Or just give them new high IDs.
        // Let's give them new high IDs.
        videoId: item.videoId,
        title: item.title,
        description: item.title // Default description
    }));

    // We want newest items at the TOP of the array usually?
    // The existing data seems to be random or oldest first?
    // Let's just append to the end if that's the standard, or prepend?
    // Looking at videos.ts, ID 1 is "The 4 Floors".
    // Let's append new items with new IDs.

    // Re-map IDs correctly
    const finalNewItems = addedData.map((d, i) => ({
        ...d,
        id: (maxId + 1 + i).toString()
    }));

    const updatedData = [...currentData, ...finalNewItems]; // Append

    console.log(`Adding ${finalNewItems.length} new items to ${variableName}...`);

    const originalContent = fs.readFileSync(filePath, 'utf-8');
    const newArrayString = JSON.stringify(updatedData, null, 2);

    // Regex to replace the array
    // export const videos: VideoData[] = [...]
    const regex = new RegExp(`export const ${variableName}: .*? = \\[([\\s\\S]*?)\\];`);

    // This regex is tricky with nested brackets.
    // Let's use the marker approach again.
    const startMarker = `export const ${variableName}:`;
    const startIndex = originalContent.indexOf(startMarker);
    if (startIndex === -1) return;

    const openBracket = originalContent.indexOf('[', startIndex);
    const closeBracket = originalContent.lastIndexOf(']');

    if (openBracket !== -1 && closeBracket !== -1) {
        const prefix = originalContent.substring(0, openBracket);
        const suffix = originalContent.substring(closeBracket + 1);
        const newContent = `${prefix}${newArrayString}${suffix}`;
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${path.basename(filePath)}`);
    }
}

async function scrapeYoutube() {
    const existingVideos = extractData(VIDEOS_FILE, 'videos');
    const existingShorts = extractData(SHORTS_FILE, 'shorts');

    const videoIds = new Set(existingVideos.map(v => v.videoId));
    const shortIds = new Set(existingShorts.map(s => s.videoId));

    console.log(`Loaded ${videoIds.size} videos and ${shortIds.size} shorts.`);

    const browser = await puppeteer.launch({ headless: false }); // Headless false to see what happens/debug
    const page = await browser.newPage();

    // Scrape Videos
    const newVideos = await scrapeTab(page, 'videos', videoIds);

    // Scrape Shorts
    const newShorts = await scrapeTab(page, 'shorts', shortIds);

    await browser.close();

    // Update Files
    if (newVideos.length > 0) {
        await updateFile(VIDEOS_FILE, 'videos', newVideos);
    } else {
        console.log('No new videos found.');
    }

    if (newShorts.length > 0) {
        await updateFile(SHORTS_FILE, 'shorts', newShorts);
    } else {
        console.log('No new shorts found.');
    }
}

scrapeYoutube().catch(console.error);
