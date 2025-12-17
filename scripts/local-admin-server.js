import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Paths
const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const GUIDES_FILE = path.join(__dirname, '../src/data/guides.json');
const STRAINS_FILE = path.join(__dirname, '../src/data/strains.json');
const IMAGES_DIR = path.join(__dirname, '../public/images/shops');
const CLIENT_DIR = path.join(__dirname, 'admin-client');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(CLIENT_DIR));
// Serve public images so the admin panel can show them
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IMAGES_DIR);
    },
    filename: function (req, file, cb) {
        // Keep original extension, sanitize name
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        cb(null, `${name}${ext}`);
    }
});
const upload = multer({ storage: storage });

// Helper to read/write TS file
function readCoffeeshops() {
    console.log('Reading coffeeshops file...');
    try {
        if (!fs.existsSync(COFFEESHOPS_FILE)) {
            console.warn('Coffeeshops file does not exist:', COFFEESHOPS_FILE);
            return [];
        }
        const content = fs.readFileSync(COFFEESHOPS_FILE, 'utf-8');
        const startMarker = 'export const coffeeshops: CoffeeshopData[] =';
        const endMarker = 'export const filterTags';

        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker);

        if (startIndex !== -1 && endIndex !== -1) {
            let rawPart = content.substring(startIndex + startMarker.length, endIndex);
            // Find the array brackets
            const arrayStart = rawPart.indexOf('[');
            const arrayEnd = rawPart.lastIndexOf(']');

            if (arrayStart !== -1 && arrayEnd !== -1) {
                const arrayString = rawPart.substring(arrayStart, arrayEnd + 1);
                try {
                    // SECURITY: Use JSON.parse instead of eval where possible
                    // Fallback to Function if simple JSON parse fails (TS files might have trailing commas)
                    // return JSON.parse(arrayString); 
                    return new Function('return ' + arrayString)();
                } catch (e) {
                    console.error('Parse error inner:', e);
                    return [];
                }
            } else {
                console.error('Array brackets not found in raw part');
            }
        } else {
            console.error('Markers not found. Start:', startIndex, 'End:', endIndex);
        }
        return [];
    } catch (err) {
        console.error('Fatal error in readCoffeeshops:', err);
        throw err;
    }
}

function writeCoffeeshops(shops) {
    const originalContent = fs.readFileSync(COFFEESHOPS_FILE, 'utf-8');
    const newArrayString = JSON.stringify(shops, null, 2);

    const startMarker = 'export const coffeeshops: CoffeeshopData[] =';
    const endMarker = 'export const filterTags';

    const startIndex = originalContent.indexOf(startMarker);
    const endIndex = originalContent.indexOf(endMarker);

    if (startIndex !== -1 && endIndex !== -1) {
        const prefix = originalContent.substring(0, startIndex + startMarker.length);
        const suffix = originalContent.substring(endIndex);
        // Ensure we have the type definition and assignment
        const newContent = `${prefix} ${newArrayString};\n\n${suffix}`;
        fs.writeFileSync(COFFEESHOPS_FILE, newContent);
        return true;
    }
    return false;
}

// Helper: Read Guides
function readGuides() {
    try {
        if (!fs.existsSync(GUIDES_FILE)) return [];
        return JSON.parse(fs.readFileSync(GUIDES_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading guides:', err);
        return [];
    }
}

// Helper: Write Guides
function writeGuides(guides) {
    try {
        fs.writeFileSync(GUIDES_FILE, JSON.stringify(guides, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing guides:', err);
        return false;
    }
}

// Helper: Read Strains
function readStrains() {
    try {
        if (!fs.existsSync(STRAINS_FILE)) return [];
        return JSON.parse(fs.readFileSync(STRAINS_FILE, 'utf8'));
    } catch (err) {
        console.error('Error reading strains:', err);
        return [];
    }
}

// Helper: Write Strains
function writeStrains(strains) {
    try {
        fs.writeFileSync(STRAINS_FILE, JSON.stringify(strains, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing strains:', err);
        return false;
    }
}

// Routes

// GET all shops
app.get('/api/shops', (req, res) => {
    try {
        console.log('GET /api/shops requested');
        const shops = readCoffeeshops();
        console.log('Read shops count:', shops.length);
        res.json(shops);
    } catch (err) {
        console.error('GET /api/shops failed:', err);
        res.status(500).json({ error: err.message });
    }
});

// POST update shops (save all)
app.post('/api/shops', (req, res) => {
    try {
        const shops = req.body;
        if (!Array.isArray(shops)) {
            return res.status(400).json({ error: 'Expected array of shops' });
        }
        const success = writeCoffeeshops(shops);
        if (success) {
            res.json({ success: true, count: shops.length });
        } else {
            res.status(500).json({ error: 'Failed to write file' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all guides
app.get('/api/guides', (req, res) => {
    try {
        const guides = readGuides();
        res.json(guides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST update guides
app.post('/api/guides', (req, res) => {
    try {
        const guides = req.body;
        if (!Array.isArray(guides)) {
            return res.status(400).json({ error: 'Expected array of guides' });
        }
        const success = writeGuides(guides);
        if (success) {
            res.json({ success: true, count: guides.length });
        } else {
            res.status(500).json({ error: 'Failed to write guides file' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all strains
app.get('/api/strains', (req, res) => {
    try {
        const strains = readStrains();
        res.json(strains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST update strains
app.post('/api/strains', (req, res) => {
    try {
        const strains = req.body;
        if (!Array.isArray(strains)) {
            return res.status(400).json({ error: 'Expected array of strains' });
        }
        const success = writeStrains(strains);
        if (success) {
            res.json({ success: true, count: strains.length });
        } else {
            res.status(500).json({ error: 'Failed to write strains file' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return the public path
    const publicPath = `/images/shops/${req.file.filename}`;
    res.json({ path: publicPath });
});

app.listen(PORT, () => {
    console.log(`Admin Server running at http://localhost:${PORT}`);
});
