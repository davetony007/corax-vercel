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

// Tag Mappings
const tagMappings = {
    "Top Pick": [
        "Happy Feelings", "The Hit", "Barney's", "Siberie", "Family First",
        "7th Heaven", "Solo", "Dampkring", "Grey Area", "Bagheera",
        "Old Church 2", "Terps Army 2", "Easy Times", "Het Ballonnetje"
    ],
    "Quality Focus": [
        "Family First", "Terps Army 2", "Catch 33", "The Hit", "Siberie",
        "Barney's", "Grey Area", "Solo", "Easy Times"
    ],
    "Good Prices": [
        "Willie Wortel Sativa", "Balou", "Headlines", "The Stud",
        "Coffeeshop Amsterdam", "Siberie", "Het Ballonnetje"
    ],
    "Historic": [
        "Dampkring", "Old Church 2", "Grey Area", "Barney's", "Siberie",
        "1e Hulp", "Abraxas", "Tweede Kamer", "The Bulldog The First"
    ],
    "Unique Vibe": [
        "Solo", "Abraxas", "Dampkring", "420 Cafe (de Kuil)", "Bluebird",
        "Katsu", "Paradox"
    ],
    "Tourist Friendly": [
        "Hunters", "The Bulldog The First", "Barney's", "Dampkring",
        "Grey Area", "1e Hulp", "Prix d'Ami", "Greenhouse"
    ]
};

let updatedCount = 0;

shops.forEach(shop => {
    let modified = false;

    // Helper to check if shop matches name (loose match)
    const matches = (nameList) => nameList.some(n => shop.name.toLowerCase().includes(n.toLowerCase()) || n.toLowerCase().includes(shop.name.toLowerCase()));

    for (const [tag, names] of Object.entries(tagMappings)) {
        if (matches(names)) {
            if (!shop.tags.includes(tag)) {
                shop.tags.push(tag);
                modified = true;
            }
        }
    }

    if (modified) {
        updatedCount++;
        // console.log(`Updated tags for ${shop.name}: ${shop.tags.join(', ')}`);
    }
});

if (updatedCount > 0) {
    console.log(`Updating tags for ${updatedCount} shops...`);

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
    console.log('No tags needed updating.');
}
