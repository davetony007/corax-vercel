import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const MENUS_DIR = path.join(__dirname, '../public/menus');

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
                // Using eval is risky but standard in this project's scripts for parsing TS data literal
                return eval('(' + arrayString + ')');
            } catch (e) {
                console.error(`Failed to parse data: ${e.message}`);
                return [];
            }
        }
    }
    return [];
}

function parseDateFromFilename(filename) {
    // Expected format: shop-name-DD-MM-YY.ext
    // We look for the last occurrence of DD-MM-YY
    const match = filename.match(/(\d{2})-(\d{2})-(\d{2})(?=\.\w+$)/);
    if (!match) return null;

    const day = parseInt(match[1]);
    const month = parseInt(match[2]) - 1; // 0-indexed
    let year = parseInt(match[3]);

    // Assume 20xx
    year += 2000;

    return new Date(year, month, day);
}

function syncMenuImages() {
    if (!fs.existsSync(MENUS_DIR)) {
        console.log('Menus directory not found.');
        return;
    }

    const shops = extractData(COFFEESHOPS_FILE);
    const allFiles = fs.readdirSync(MENUS_DIR);
    let updatedCount = 0;

    console.log(`Found ${shops.length} shops and ${allFiles.length} menu files.`);

    shops.forEach(shop => {
        // Normalize shop name to find matches
        // Logic must match scrape-latest-menus.js
        // FIX: Remove apostrophes first to match "Hunter's" -> "hunters" instead of "hunter-s"
        const normalizedShopName = shop.name
            .replace(/'/g, '')
            .replace(/[^a-z0-9]/gi, '-')
            .toLowerCase()
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        // Find files that start with this shop name and have a date pattern
        // The file should look like: normalizedShopName-DD-MM-YY.ext
        const shopFiles = allFiles.filter(file => {
            if (!file.startsWith(normalizedShopName + '-')) return false;
            // distinct date pattern check
            return /\d{2}-\d{2}-\d{2}\.\w+$/.test(file);
        });

        if (shopFiles.length === 0) return;

        // Sort files by date descending (newest first)
        shopFiles.sort((a, b) => {
            const dateA = parseDateFromFilename(a);
            const dateB = parseDateFromFilename(b);
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            return dateB - dateA; // Descending
        });

        const newMenuImages = shopFiles.map(f => `/menus/${f}`);

        // Compare with current images to see if we need to update
        // We only care if the list is different
        const currentImages = shop.menuImages || [];

        const isDifferent = newMenuImages.length !== currentImages.length ||
            !newMenuImages.every((val, index) => val === currentImages[index]);

        if (isDifferent) {
            shop.menuImages = newMenuImages;
            updatedCount++;
            // console.log(`Updated menus for ${shop.name}: ${newMenuImages.length} images.`);
        }
    });

    if (updatedCount > 0) {
        console.log(`Updating links for ${updatedCount} shops...`);

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
            console.log('Successfully synced coffeeshops.ts with public/menus files.');
        } else {
            console.error('Could not find markers in coffeeshops.ts to write data.');
        }
    } else {
        console.log('Coffeeshop menu links are already up to date.');
    }
}

syncMenuImages();
