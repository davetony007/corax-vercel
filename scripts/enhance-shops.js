import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COFFEESHOPS_FILE = path.join(__dirname, '../src/data/coffeeshops.ts');
const SHORTS_FILE = path.join(__dirname, '../src/data/shorts.ts');
const TRANSCRIPT_FILE = path.join(__dirname, '../transcript-data.ts');

// Manual mappings for tricky shop names
const SHOP_MAPPINGS = {
    'shopeeito': 'siberie',
    'bira': 'bagheera',
    'aira': 'bagheera',
    'aloo': 'balou',
    'belaloo': 'balou',
    'baloo': 'balou',
    'balon': 'het ballonnetje',
    'balonage': 'het ballonnetje',
    'baloner': 'het ballonnetje',
    'damping': 'dampkring',
    'turps army': 'terps army',
    'buryongans': 'boerejongens',
    'boerenjongens': 'boerejongens',
    'kashop paloo': 'balou',
    'bagira': 'bagheera',
    'yaspel': 'yanks',
    'bubin yonglands': 'boerejongens',
    'drewis sharing': 'mediterrane drewissharing',
    'drewissharing': 'mediterrane drewissharing',
    'drew\'s': 'mediterrane drewissharing',
    'hashtag': 'hashtag',
    '#': 'hashtag',
    'the hit': 'the hit',
    'hit': 'the hit',
    'old church': 'the old church',
    'cover shop old church': 'the old church',
    '1e hulp': '1e hulp',
    'family first': 'family first',
    'the stud': 'the stud',
    'stud': 'the stud',
    'grey area': 'grey area',
    'barney': 'barneys',
    'barney\'s': 'barneys',
    'amnesia': 'amnesia',
    'green place': 'green place',
    'solo': 'solo',
    'happy feelings': 'happy feelings',
    'easy times': 'easy times',
    'new times': 'new times',
    'sativa': 'sativa',
    'cover sativa': 'sativa',
    'hunters': 'hunters',
    'hunter\'s': 'hunters',
    'prix d\'ami': 'prix d\'ami',
    'prix dami': 'prix d\'ami',
    'catch 33': 'catch 33',
    '7th heaven': '7th heaven',
    'bagheera': 'bagheera',
    'abraxas': 'abraxas',
    'dampkring': 'dampkring',
    'bluebird': 'bluebird',
    'katsu': 'katsu',
    'paradox': 'paradox',
    'voyagers': 'voyagers',
    'het gelderse': 'het gelderse',
    'siberie': 'siberie',
    'de kroon': 'de kroon',
    '420 cafe': '420 cafe',
    '420': '420 cafe',
    'rookerij': 'rookerij',
    'tweede kamer': 'tweede kamer',
    'central': 'central',
    'kadinsky': 'kadinsky',
    'coffeeshop amsterdam': 'coffeeshop amsterdam',
    'new amsterdam': 'new amsterdam',
    'rock-it': 'rock-it',
    'rock it': 'rock-it',
    'spirit': 'spirit',
    'reefer': 'reefer',
    'jolly joker': 'jolly joker',
    'bulldog': 'the bulldog',
    'the bulldog': 'the bulldog',
    'goa': 'goa',
    'popeye': 'popeye',
    'popeye\'s': 'popeye',
    'dream bros': 'dreams',
    'dreams': 'dreams',
    'legal flower': 'ignore',
    'legal': 'ignore'
};

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
                console.error(`Failed to parse coffeeshops data: ${e.message}`);
                return [];
            }
        }
    }
    return [];
}

function extractShorts(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const startMarker = 'export const shorts: ShortData[] =';
    const startIndex = content.indexOf(startMarker);
    if (startIndex !== -1) {
        let rawPart = content.substring(startIndex + startMarker.length);
        const arrayStart = rawPart.indexOf('[');
        const arrayEnd = rawPart.lastIndexOf(']');
        if (arrayStart !== -1 && arrayEnd !== -1) {
            const arrayString = rawPart.substring(arrayStart, arrayEnd + 1);
            try {
                return eval('(' + arrayString + ')');
            } catch (e) {
                console.error(`Failed to parse shorts data: ${e.message}`);
                return [];
            }
        }
    }
    return [];
}

function normalizeShopName(name) {
    let clean = name.toLowerCase()
        .replace(/coffeeshop/g, '')
        .replace(/coffee shop/g, '')
        .replace(/cover shop/g, '')
        .replace(/shop/g, '')
        .replace(/amsterdam/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();

    for (const [key, value] of Object.entries(SHOP_MAPPINGS)) {
        if (clean.includes(key) || name.toLowerCase().includes(key)) {
            return value;
        }
    }

    return clean;
}

function parseTranscript() {
    const content = fs.readFileSync(TRANSCRIPT_FILE, 'utf-8');
    const lines = content.split('\n');
    const reviews = [];

    let inTable = false;

    for (const line of lines) {
        if (line.trim().startsWith('| :---')) {
            inTable = true;
            continue;
        }
        if (line.trim().startsWith('|') && inTable) {
            const parts = line.split('|').map(p => p.trim()).filter(p => p);
            if (parts.length >= 3) {
                let shopName = parts[0].replace(/\*\*/g, '');
                let strain = parts[1];
                let score = parts[2];
                let videoTitle = '';

                if (parts.length >= 4) {
                    if (parts[3].startsWith('"')) {
                        videoTitle = parts[3].replace(/"/g, '');
                    } else if (parts.length >= 5 && parts[4].startsWith('"')) {
                        videoTitle = parts[4].replace(/"/g, '');
                    }
                }

                reviews.push({
                    shopName,
                    strain,
                    score,
                    videoTitle
                });
            }
        }
    }
    return reviews;
}

function enhanceShops() {
    const shops = extractData(COFFEESHOPS_FILE);
    const shorts = extractShorts(SHORTS_FILE);
    const transcriptReviews = parseTranscript();

    console.log(`Loaded ${shops.length} shops, ${shorts.length} shorts, ${transcriptReviews.length} reviews.`);

    let updatedCount = 0;

    transcriptReviews.forEach(review => {
        const normalizedReviewShop = normalizeShopName(review.shopName);

        const shop = shops.find(s => {
            const normalizedShop = normalizeShopName(s.name);
            return normalizedShop === normalizedReviewShop ||
                s.name.toLowerCase().includes(normalizedReviewShop) ||
                normalizedReviewShop.includes(s.name.toLowerCase());
        });

        if (shop) {
            if (!shop.reviews) shop.reviews = [];

            let videoId = undefined;
            if (review.videoTitle) {
                const short = shorts.find(s => s.title.toLowerCase().includes(review.videoTitle.toLowerCase()) || review.videoTitle.toLowerCase().includes(s.title.toLowerCase()));
                if (short) {
                    videoId = short.videoId;
                }
            }

            const exists = shop.reviews.some(r => r.strain === review.strain && r.score === review.score);
            if (!exists) {
                shop.reviews.push({
                    strain: review.strain,
                    score: review.score,
                    approval: review.score,
                    videoId: videoId,
                    videoTitle: review.videoTitle
                });
                updatedCount++;
            }
        }
    });

    // Recalculate flags for all shops
    shops.forEach(shop => {
        if (shop.reviews && shop.reviews.length > 0) {
            let recommended = false;
            let approved = false;

            shop.reviews.forEach(r => {
                const scoreLower = r.score.toLowerCase();
                if (scoreLower.includes('approved') || scoreLower.includes('recommended') ||
                    (!isNaN(parseFloat(r.score)) && parseFloat(r.score) >= 8.0)) {
                    recommended = true;
                }

                // Check for high praise
                const isHighPraise = (scoreLower.includes('approved') &&
                    (scoreLower.includes('highly') || scoreLower.includes('absolutely') ||
                        scoreLower.includes('mega') || scoreLower.includes('super'))) ||
                    scoreLower.includes('spectacular') ||
                    scoreLower.includes('crazy') ||
                    scoreLower.includes('killer') ||
                    (!isNaN(parseFloat(r.score)) && parseFloat(r.score) >= 9.0);

                if (isHighPraise) {
                    approved = true;
                }
            });

            if (shop.name === 'Happy Feelings') {
                console.log(`Debug Happy Feelings: recommended=${recommended}, approved=${approved}, current_rec=${shop.recommended}, current_app=${shop.coraxApproved}`);
            }

            if (recommended && !shop.recommended) {
                shop.recommended = true;
                updatedCount++;
            }
            if (approved && !shop.coraxApproved) {
                shop.coraxApproved = true;
                updatedCount++;
            }
        }
    });

    console.log(`Updated ${updatedCount} items (reviews or flags).`);

    if (updatedCount > 0) {
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
    }
}

enhanceShops();
