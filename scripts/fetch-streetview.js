import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const IMAGES_DIR = path.join(__dirname, '../public/images/shops');

// REPLACE THIS WITH YOUR GOOGLE MAPS STATIC API KEY
const API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

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

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                reject(new Error(`Failed to download image: Status Code ${res.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
}

async function fetchStreetViewImages() {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        console.error('Error: Please set GOOGLE_MAPS_API_KEY environment variable or edit the script with your key.');
        return;
    }

    if (!fs.existsSync(IMAGES_DIR)) {
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    const shops = extractData(COFFEESHOPS_FILE);
    console.log(`Found ${shops.length} shops.`);

    let updatedCount = 0;

    for (const shop of shops) {
        const imageFilename = `${shop.id}.jpg`;
        const imagePath = path.join(IMAGES_DIR, imageFilename);
        const publicPath = `/images/shops/${imageFilename}`;

        // Check if we already have a custom image (not the default review-1.jpg)
        // Or if we specifically want to overwrite everything, we can change this logic.
        // For now, let's download if the file doesn't exist locally.
        if (fs.existsSync(imagePath)) {
            // console.log(`Image exists for ${shop.name}, skipping.`);

            // Update path in data if it's still using the default
            if (shop.image === "/src/assets/review-1.jpg") {
                shop.image = publicPath;
                updatedCount++;
            }
            continue;
        }

        console.log(`Fetching Street View for ${shop.name}...`);

        const [lat, lng] = shop.coordinates;
        // Google Street View Static API URL
        // size: 600x400 (standard card ratio)
        // location: lat,lng
        // fov: 90 (field of view)
        // heading: optional, but we don't know the best heading. Default is usually okay or we could calculate it.
        // pitch: 10 (slightly up)
        const url = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lng}&fov=90&pitch=10&key=${API_KEY}`;

        try {
            await downloadImage(url, imagePath);
            console.log(`Saved to ${imagePath}`);

            shop.image = publicPath;
            updatedCount++;

            // Be nice to the API
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (e) {
            console.error(`Failed to fetch for ${shop.name}: ${e.message}`);
        }
    }

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
        console.log('No changes made to coffeeshops.ts');
    }
}

fetchStreetViewImages().catch(console.error);
