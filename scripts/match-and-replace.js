const fs = require('fs');
const path = require('path');

const shopsPath = path.join(__dirname, '../src/data/coffeeshops.ts');
const imagesDir = path.join(__dirname, '../public/images/shops');

function sanitize(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const availableImages = fs.readdirSync(imagesDir).filter(f => !f.endsWith('.svg'));
let content = fs.readFileSync(shopsPath, 'utf8');

let updatedCount = 0;

// Re-implement parsing because replacing strictly line-by-line is safest.
// We look for blocks.

const lines = content.split('\n');
const newLines = [];

let currentShopName = null;
let currentShopId = null;

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Capture ID
    const idMatch = line.match(/"id":\s*"([^"]+)"/);
    if (idMatch) currentShopId = idMatch[1];

    // Capture Name
    const nameMatch = line.match(/"name":\s*"([^"]+)"/);
    if (nameMatch) currentShopName = nameMatch[1];

    // Check for Image
    const imageMatch = line.match(/"image":\s*"([^"]+)"/);
    if (imageMatch) {
        const currentImage = imageMatch[1];
        if (currentImage.endsWith('.svg')) {
            // Try to find a match
            let match = null;

            // 1. ID Match
            if (currentShopId) {
                match = availableImages.find(f => f.match(new RegExp(`^${currentShopId}\\.(jpg|png|jpeg|webp|avif)$`, 'i')));
            }

            // 2. Name Match
            if (!match && currentShopName) {
                const cleanName = sanitize(currentShopName);
                match = availableImages.find(f => {
                    const cleanFile = sanitize(f);
                    // Match if file contains name OR name contains file (minus extension)
                    // But usually file is longer: shop-name-timestamp.jpg
                    return cleanFile.includes(cleanName);
                });
            }

            // 3. Special Case: Hyphenated name match (e.g. "Coffeeshop Name" -> "coffeeshop-name")
            if (!match && currentShopName) {
                const hyphenName = currentShopName.toLowerCase().replace(/\s+/g, '-');
                match = availableImages.find(f => f.toLowerCase().includes(hyphenName));
            }

            if (match) {
                console.log(`MATCHED: ${currentShopName} (${currentImage}) -> ${match}`);
                // Replace the line
                // Preserve indentation
                const spaces = line.split('"image":')[0];
                line = `${spaces}"image": "/images/shops/${match}",`;
                updatedCount++;
            } else {
                console.log(`NO MATCH: ${currentShopName} (${currentImage})`);
            }
        }
    }

    // Reset state on structure boundaries if needed, but simple linear scan with "current" vars works 
    // because properties are usually sequential in the object.
    // Ideally we reset at `},` closing brace.
    if (line.trim() === '},') {
        currentShopName = null;
        currentShopId = null;
    }

    newLines.push(line);
}

fs.writeFileSync(shopsPath, newLines.join('\n'), 'utf8');
console.log(`Updated ${updatedCount} shops.`);
