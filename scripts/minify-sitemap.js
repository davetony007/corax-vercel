import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, '../out/sitemap.xml');

try {
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error(`Error: Sitemap not found at ${SITEMAP_PATH}`);
        process.exit(1);
    }

    console.log(`Minifying sitemap at: ${SITEMAP_PATH}`);
    const content = fs.readFileSync(SITEMAP_PATH, 'utf-8');

    // Remove newlines and trim whitespace between tags
    // This regex replaces ">   <" with "><" and generally removes whitespace around tags
    const minified = content
        .replace(/>\s+</g, '><')
        .replace(/\s{2,}/g, ' ') // Collapse multiple spaces to one (safety)
        .trim();

    fs.writeFileSync(SITEMAP_PATH, minified);
    console.log('Sitemap minified successfully.');

} catch (error) {
    console.error('Failed to minify sitemap:', error);
    process.exit(1);
}
