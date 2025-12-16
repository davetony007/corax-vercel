const fs = require('fs');
const path = require('path');

const shopsPath = path.join(__dirname, '../src/data/coffeeshops.ts');
const imagesDir = path.join(__dirname, '../public/images/shops');

// Helper to sanitize name for matching
function sanitize(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// 1. Get all available images
const availableImages = fs.readdirSync(imagesDir).filter(f => !f.endsWith('.svg'));

// 2. Parse coffeeshops.ts roughly
const content = fs.readFileSync(shopsPath, 'utf8');

// We need to parse the object structure to get ID, Name, and Image.
// Regex is brittle but let's try to extract blocks.
// We'll iterate line by line and track state.

const shops = [];
let currentShop = {};
let inShop = false;

const lines = content.split('\n');
lines.forEach(line => {
    if (line.trim().startsWith('{')) {
        inShop = true;
        currentShop = {};
    } else if (line.trim().startsWith('}')) {
        if (inShop && currentShop.id && currentShop.name && currentShop.image) {
            shops.push(currentShop);
        }
        inShop = false;
    } else if (inShop) {
        const idMatch = line.match(/"id":\s*"([^"]+)"/);
        const nameMatch = line.match(/"name":\s*"([^"]+)"/);
        const imageMatch = line.match(/"image":\s*"([^"]+)"/);

        if (idMatch) currentShop.id = idMatch[1];
        if (nameMatch) currentShop.name = nameMatch[1];
        if (imageMatch) currentShop.image = imageMatch[1];
    }
});

// 3. Find matches
const updates = [];

shops.forEach(shop => {
    if (shop.image.includes('.svg')) {
        console.log(`Looking for match for: ${shop.name} (ID: ${shop.id}, Current: ${shop.image})`);

        // Strategy 1: Check if there's a file with the ID (e.g. "116.jpg")
        let match = availableImages.find(f => f.match(new RegExp(`^${shop.id}\\.(jpg|png|jpeg|webp|avif)$`, 'i')));

        // Strategy 2: Check for name match
        if (!match) {
            const cleanName = sanitize(shop.name);
            match = availableImages.find(f => {
                const cleanFile = sanitize(f);
                return cleanFile.includes(cleanName);
            });
        }

        if (match) {
            console.log(`  -> FOUND MATCH: ${match}`);
            updates.push({
                id: shop.id,
                name: shop.name,
                oldImage: shop.image,
                newImage: `/images/shops/${match}`
            });
        } else {
            console.log(`  -> NO MATCH FOUND`);
        }
    }
});

// 4. Output results
console.log('\n--- MATCH SUMMARY ---');
console.log(`Found ${updates.length} potential updates.`);
fs.writeFileSync('image_updates.json', JSON.stringify(updates, null, 2));
