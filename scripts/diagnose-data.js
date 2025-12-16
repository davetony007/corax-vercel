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
console.log(`Total shops: ${shops.length}`);

const otherside = shops.find(s => s.name.includes("Otherside"));
if (otherside) {
    console.log(`FOUND: ${otherside.name}`);
    console.log(`Image: ${otherside.image}`);
    console.log(`Menu Images: ${JSON.stringify(otherside.menuImages)}`);
} else {
    console.log("NOT FOUND: The Otherside");
}

const hulp = shops.find(s => s.name.includes("1e Hulp"));
if (hulp) {
    console.log(`FOUND: ${hulp.name}`);
    console.log(`Menu Images: ${JSON.stringify(hulp.menuImages)}`);
} else {
    console.log("NOT FOUND: 1e Hulp");
}
