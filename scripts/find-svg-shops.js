const fs = require('fs');
const path = require('path');

const shopsPath = path.join(__dirname, '../src/data/coffeeshops.ts');
const content = fs.readFileSync(shopsPath, 'utf8');

// Regex to match shop entries roughly
// looking for name: "..." and image: "..." in the same object block
// simple approach: split by "id:" or just match individual properties and try to correlate?
// Better: match the whole object? No, too complex for regex.
// Let's just match unique image paths that look like SVGs and print them.
// But the user wants "list all the coffeeshops", so I need the names.

// Let's try to parse it more smartly.
// We can use a regex that captures name and image.
// Assuming "name" comes before "image".

const lines = content.split('\n');
let currentShop = null;
const svgShops = [];

lines.forEach(line => {
    const nameMatch = line.match(/^\s*"name":\s*"([^"]+)",/);
    if (nameMatch) {
        currentShop = nameMatch[1];
    }

    // Also handle just name: "..." (without quotes on key if applicable, though JSON style usually has them)
    // The file seems to use TS object literals, so keys might not be quoted? 
    // From previous view, keys WERE quoted: "id": "1", "name": "The 4 Floors"

    const imageMatch = line.match(/^\s*"image":\s*"([^"]+)",/);
    if (imageMatch) {
        const imagePath = imageMatch[1];
        if (imagePath.toLowerCase().endsWith('.svg') && currentShop) {
            svgShops.push({ name: currentShop, image: imagePath });
        }
    }
});

console.log("Found " + svgShops.length + " shops with SVG images:");
svgShops.forEach(shop => {
    console.log(`- ${shop.name}: ${shop.image}`);
});
