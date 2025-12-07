import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_FILE = path.join(__dirname, '../public/sitemap.xml');

try {
    const xml = fs.readFileSync(SITEMAP_FILE, 'utf-8');

    // Check for leading whitespace
    if (xml.trimStart() !== xml) {
        console.error('ERROR: Leading whitespace detected!');
    }

    if (!xml.startsWith('<?xml')) {
        console.error('ERROR: File does not start with <?xml declaration');
    }

    // Simple check for unescaped ampersands
    const lines = xml.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('&') && !line.match(/&(amp|lt|gt|quot|apos);/)) {
            console.warn(`WARNING: Possible unescaped ampersand at line ${index + 1}: ${line.trim()}`);
        }
    });

    console.log('Validation complete. If no errors above, basic structure is likely okay.');
    console.log('First 50 chars:', xml.substring(0, 50));

} catch (err) {
    console.error('Failed to read file:', err);
}
