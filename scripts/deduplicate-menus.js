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

function deduplicateMenus() {
    if (!fs.existsSync(MENUS_DIR)) return;

    const files = fs.readdirSync(MENUS_DIR);
    const fileMap = new Map(); // basename -> [extensions]

    // Group files by basename
    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        const basename = path.basename(file, ext);
        if (!fileMap.has(basename)) {
            fileMap.set(basename, []);
        }
        fileMap.get(basename).push(ext);
    });

    let deletedFiles = [];

    // Find duplicates
    fileMap.forEach((exts, basename) => {
        if (exts.length > 1) {
            // If we have both .png and .jpg, delete .jpg
            if (exts.includes('.png') && exts.includes('.jpg')) {
                const jpgFile = `${basename}.jpg`;
                const jpgPath = path.join(MENUS_DIR, jpgFile);
                fs.unlinkSync(jpgPath);
                deletedFiles.push(jpgFile);
                console.log(`Deleted duplicate: ${jpgFile} (kept .png)`);
            }
        }
    });

    if (deletedFiles.length > 0) {
        // Update coffeeshops.ts
        const shops = extractData(COFFEESHOPS_FILE);
        let removedRefs = 0;

        shops.forEach(shop => {
            if (shop.menuImages && shop.menuImages.length > 0) {
                const initialLength = shop.menuImages.length;
                shop.menuImages = shop.menuImages.filter(img => {
                    const filename = path.basename(img);
                    return !deletedFiles.includes(filename);
                });
                removedRefs += (initialLength - shop.menuImages.length);
            }
        });

        console.log(`Removed ${removedRefs} references from coffeeshops.ts`);

        if (removedRefs > 0) {
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
    } else {
        console.log('No duplicates found.');
    }
}

deduplicateMenus();
