const fs = require('fs');
const path = require('path');

const shopsPath = 'src/data/coffeeshops.ts';
const videosPath = 'src/data/videos.ts';

const shopsContent = fs.readFileSync(shopsPath, 'utf8');
const videosContent = fs.readFileSync(videosPath, 'utf8');

// --- 1. Load Data ---

function parseVideos(content) {
    const videoMap = {}; // Title -> ID
    const regex = /"videoId":\s*"([^"]+)",\s*[\s\S]*?"title":\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        videoMap[match[2].trim().toLowerCase()] = match[1];
    }
    return videoMap;
}

function parseShops(content) {
    const shopMap = {}; // Name -> ID
    const regex = /{[\s\S]*?"id":\s*"([^"]+)",[\s\S]*?"name":\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        shopMap[match[2].trim().toLowerCase()] = match[1];
    }
    return shopMap;
}

const videoTitleToId = parseVideos(videosContent);
const shopNameToId = parseShops(shopsContent);

// Manual overrides for shop name matching
const shopAliases = {
    "coffeeshop headlines (zandam)": "headlines",
    "coffeeshop headlines": "headlines",
    "headlines": "headlines (zandam)", // fuzzy?
    "coffeeshop get down": "get down to it",
    "get down": "get down to it",
    "coffeeshop freedom": "freedom",
    "coffeeshop actama": "actama", // check if exists
    "coffeeshop bagira": "bagira", // check if exists
    "coffeeshop 77": "77", // check if exists
    "coffeeshop the stud": "the stud",
    "the stud": "the stud",
    "coffeeshop baraka": "baraka",
    "coffeeshop rocket": "rocket",
    "coffeeshop bullwicki": "bullwackie", // guess?
    "bullwicki": "bullwackie",
    "coffeeshop catch 33": "catch 33",
    "coffeeshop sharing": "sharing",
    "coffeeshop boerejongens": "boerejongens west", // ambiguous, multiple boerejongens?
    "african black star": "black star",
    "coffeeshop siberië": "siberie",
    "coffeeshop amsterdam": "coffeeshopamsterdam",
    "coffeeshop the h": "the h",
};

// --- 2. User Table Data ---
const rawTable = [
    ["#AMSTERDAM COFFEESHOPS *UNCENSORED CUT* TESTING MY NEW TITANIUM GADGET + + FOOD + HISTORY #vlog", "Chapito, 7th Heaven, 137, 77, Terps Army, The Bulldog"],
    ["AMSTERDAM'S HISTORY OF MADNESS + NEW COFFEESHOP + MUNCHIES", "Carmona, Terps Army"],
    ["CINEMATIC STRAIN REVIEW: CHOCOLATE DIESEL & TROPICANA CHERRY", "Crush, Easy Times"],
    ["COFFEESHOPS OUTSIDE OF AMSTERDAM.. IS IT WORTH IT? + UNDERCOVER TEST!", "Sativa"],
    ["Coffeeshops No One Is Talking About (Anymore)", "Solo, The Jolly Joker, Hashtag, Het Ballonnetje"],
    ["DOES THIS COFFEESHOP AWARDS ENTRY DELIVER?", "African Black Star"],
    ["First Time In Amsterdam? 3 Coffeeshops For A Quick Arrival (Less Than 10 Min Walking from Central)", "CoffeeshopAmsterdam, Barney's Farm, Amnesia, Siberië"],
    ["From AMSTERDAM To LEGAL FLOWER in 15 MINUTES (Step By Step TUTORIAL)+ MUNCHIES + Best SPOTS to CHILL", "Headlines"],
    ["I BOUGHT FLOWER FROM SOME OF AMSTERDAM'S BEST COFFEESHOPS", "African Black Star, The H, Hashtag, 137, Family First"],
    ["I BOUGHT THESE 5 LEGAL FLOWERS IN A COFFEESHOP NEXT TO #AMSTERDAM", "Coffeeshop in Almere"], // Skip?
    ["I Tested Coffeeshops I Have Never Visited Before (Piatella for 22€ ? ) + Food", "Freedom, Actama, Happy Feelings, Bagira"],
    ["I Tested My Favorite Coffeeshops in Amsterdam (Undercover) (Gone Wrong, Again..)", "Chapito, Bagira, Hashtag"],
    ["Lemon Kush x Cherry Zkittlez! Does this work? Oh hell YEAH", "Sativa, 137"],
    ["NEW Drive-Through Coffeeshop in Utrecht + NEW McDonald's Sandwiches vlog #002", "Drive-Thru Coffeeshop in Utrecht"], // Skip
    ["SEEKING AN O.G. IN #AMSTERDAM + RED LIGHT DISTRICT SHOTS + MUNCHIES + HISTORY #vlog #003", "Goa, Greenhouse, Crush, Flower Power, 137, Easy Times, De Graal"],
    ["TESTING MY NEW TITANIUM GADGET IN #AMSTERDAM @COFFEESHOP 7TH HEAVEN + FOOD + HISTORY + BIKING #vlog", "Chapito, 7th Heaven, 137, 77, Terps Army"],
    ["THE BEST COFFEESHOPS IN #AMSTERDAM 2025 (NO NONSENSE)", "Green Place, The H, Sativa, Prix, Family First, Chapito, 7th Heaven, 137, Terps Army, The Plaque, New Times, Reefer"],
    ["THIS COFFEESHOP'S MOST EXPENSIVE ITEM IS 12.50 + THE MUNCHIES #amsterdam vlog #1", "Relax, Popeye, Spies, Greenhouse, L from the Land, Barney's Farm, Het Schip, Family First, Prix, The Bulldog"],
    ["The BEST Coffeeshops in #AMSTERDAM 2025 (SUMMER EDITION)", "Terps Army, Family First, Easy Times, Green Place"],
    ["The BEST Coffeeshops in #AMSTERDAM 2025 (SUMMER EDITION) *NPC CUT*", "Terps Army, Family First, Easy Times, Green Place"],
    ["The Ice Cream Cake Everyone's Sleeping On", "Sativa, 137"],
    ["This Rainbow Lava Belongs Into The Vulcano", "137, Sativa"],
    ["VISITING My Viewers COFFEESHOP Recommendations In AMSTERDAM Part 2 + FOOD + PARKS", "Bullwicki, Easy Times, Get Down, Yoyo"],
    ["VISITING My Viewers COFFEESHOP Recommendations in AMSTERDAM + Food + GIVEAWAY", "The Stud, Mr. K, DNA, Katsu, Barney's Farm"],
    ["Visiting The Worst Reviewed Coffeeshops In Amsterdam (GONE WRONG) + Food + History", "Baraka, Rocket, Bullwicki, City Hall"],
    ["What Can You Get For 10 € In Amsterdam Coffeeshops in The Year 2025", "Flower Power, Catch 33, African Black Star, Boerejongens, Easy Times, Bagira, Sharing"],
    ["Why Does Nobody Seem To Care About These Amsterdam Coffeeshops? I Investigated +🥦Friendly-Bar + FOOD", "Superskunk, Saint, Babylon"]
];

function findShopId(name) {
    let n = name.toLowerCase().replace("coffeeshop ", "").replace("coffeeshops ", "").trim();
    if (shopAliases[n]) n = shopAliases[n];

    // Exact match
    if (shopNameToId[n]) return shopNameToId[n];

    // Partial keys
    const keys = Object.keys(shopNameToId);
    const matches = keys.filter(k => k === n || k.includes(n));
    if (matches.length > 0) return shopNameToId[matches[0]];

    return null;
}

// Gather all video IDs involved in this audit
const auditedVideoIds = new Set();
const shopOperations = {}; // ShopID -> Set<VideoID> to ADD

rawTable.forEach(([title, shopsStr]) => {
    const t = title.trim().toLowerCase();
    const videoId = videoTitleToId[t];
    if (!videoId) return;

    auditedVideoIds.add(videoId);

    const names = shopsStr.split(',').map(s => s.trim());
    names.forEach(name => {
        const sid = findShopId(name);
        if (sid) {
            if (!shopOperations[sid]) shopOperations[sid] = new Set();
            shopOperations[sid].add(videoId);
        } else {
            console.log(`Missing Shop: ${name}`);
        }
    });
});

console.log(`Auditing ${auditedVideoIds.size} videos.`);

// --- 3. Modify content ---
// Strategy: 
// 1. Regex find all shops. 
// 2. Parse their videoIds.
// 3. Filter out auditedVideoIds.
// 4. Add back the ones from shopOperations.
// 5. Replace the videoIds block in the string.

let newShopsContent = shopsContent;

// We need to iterate carefully. 
// We will build a list of replacements: { start, end, newContent }
// doing it solely via regex match on the file structure.

const shopRegex = /{\s*"id":\s*"([^"]+)",[\s\S]*?"videoIds":\s*\[([\s\S]*?)\]/g;
const replacements = [];

let sMatch;
while ((sMatch = shopRegex.exec(shopsContent)) !== null) {
    const shopId = sMatch[1];
    const currentVideoBlock = sMatch[2]; // Content inside [ ... ]

    // Parse current IDs
    let currentIds = [];
    let idMatch;
    const vIdRegex = /"([^"]+)"/g;
    while ((idMatch = vIdRegex.exec(currentVideoBlock)) !== null) {
        currentIds.push(idMatch[1]);
    }

    // Step 1: Remove audited videos
    const keptIds = currentIds.filter(vid => !auditedVideoIds.has(vid));

    // Step 2: Add correct videos
    if (shopOperations[shopId]) {
        shopOperations[shopId].forEach(vid => {
            if (!keptIds.includes(vid)) {
                keptIds.push(vid);
            }
        });
    }

    // Determine replacement string
    const indent = "    ";
    let newBlockContent = "";
    if (keptIds.length > 0) {
        newBlockContent = "\n" + keptIds.map(vid => `${indent}  "${vid}"`).join(",\n") + "\n" + indent;
    }

    // Calculate replacement range
    // invalidating the whole match isn't right because we only captured up to videoIds end bracket
    // The regex matched: { ... "videoIds": [ ... ]
    // We need the index of sMatch[2] relative to file
    const blockStart = sMatch.index + sMatch[0].lastIndexOf(sMatch[2]);
    const blockEnd = blockStart + sMatch[2].length;

    replacements.push({
        start: blockStart,
        end: blockEnd,
        content: newBlockContent
    });
}

// Apply replacements from bottom to top to preserve indices
replacements.sort((a, b) => b.start - a.start);

replacements.forEach(rep => {
    newShopsContent = newShopsContent.substring(0, rep.start) + rep.content + newShopsContent.substring(rep.end);
});

fs.writeFileSync(shopsPath, newShopsContent);
console.log("Done.");
