import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');

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

const shops = extractData(COFFEESHOPS_FILE);
let updatedCount = 0;

shops.forEach(shop => {
    if (shop.recommended && !shop.coraxApproved) {
        shop.coraxApproved = true;
        updatedCount++;
        console.log(`Promoted ${shop.name} to Corax Approved`);
    }
});

if (updatedCount > 0) {
    console.log(`Updating ${updatedCount} shops...`);

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
} else {
    console.log('No shops needed updating.');
}
