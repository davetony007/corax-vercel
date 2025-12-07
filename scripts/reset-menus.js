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
                return eval('(' + arrayString + ')');
            } catch (e) {
                console.error(`Failed to parse data: ${e.message}`);
                return [];
            }
        }
    }
    return [];
}

function resetMenus() {
    // 1. Delete all .jpg files in menus directory
    if (fs.existsSync(MENUS_DIR)) {
        const files = fs.readdirSync(MENUS_DIR);
        let deletedCount = 0;
        files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.jpg') {
                fs.unlinkSync(path.join(MENUS_DIR, file));
                deletedCount++;
            }
        });
        console.log(`Deleted ${deletedCount} .jpg files from ${MENUS_DIR}`);
    }

    // 2. Remove .jpg references from coffeeshops.ts
    const shops = extractData(COFFEESHOPS_FILE);
    let removedCount = 0;

    shops.forEach(shop => {
        if (shop.menuImages && shop.menuImages.length > 0) {
            const initialLength = shop.menuImages.length;
            // Keep only non-jpg files (assuming originals are png)
            shop.menuImages = shop.menuImages.filter(img => !img.toLowerCase().endsWith('.jpg'));

            removedCount += (initialLength - shop.menuImages.length);
        }
    });

    console.log(`Removed ${removedCount} .jpg references from coffeeshops.ts`);

    if (removedCount > 0) {
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
}

resetMenus();
