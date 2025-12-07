import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const IMAGES_DIR = path.join(__dirname, '../public/images/shops');

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

function generateSVG(text, id) {
    // Generate a deterministic color based on ID
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hue1 + 40) % 360;

    // Dark theme friendly gradients
    const color1 = `hsl(${hue1}, 70%, 20%)`;
    const color2 = `hsl(${hue2}, 70%, 10%)`;
    const textColor = `hsl(${hue1}, 80%, 90%)`;

    // Escape XML characters
    const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad${id})" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
    ${safeText}
  </text>
  <text x="50%" y="80%" font-family="Arial, sans-serif" font-size="14" fill="${textColor}" fill-opacity="0.6" text-anchor="middle">
    Corax Amsterdam Explorer
  </text>
</svg>`;
}

async function generatePlaceholders() {
    if (!fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    const shops = extractData(COFFEESHOPS_FILE);
    console.log(`Found ${shops.length} shops.`);

    let updatedCount = 0;

    for (const shop of shops) {
        const imageFilename = `${shop.id}.svg`;
        const imagePath = path.join(IMAGES_DIR, imageFilename);
        const publicPath = `/images/shops/${imageFilename}`;

        // Generate SVG
        const svgContent = generateSVG(shop.name, shop.id);
        fs.writeFileSync(imagePath, svgContent);

        // Update path in data if it's using the default or if we want to force update
        // Let's only update if it's the default review-1.jpg OR if it was previously set to an auto-generated svg
        if (shop.image === "/src/assets/review-1.jpg" || shop.image.endsWith('.svg')) {
            if (shop.image !== publicPath) {
                shop.image = publicPath;
                updatedCount++;
            }
        }
    }

    console.log(`Generated ${shops.length} placeholders.`);

    if (updatedCount > 0) {
        console.log(`Updating ${updatedCount} shops with new image paths...`);

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
        console.log('No changes needed in coffeeshops.ts');
    }
}

generatePlaceholders().catch(console.error);
