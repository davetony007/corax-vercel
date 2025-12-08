const fs = require('fs');

// 1. Read Data Files
const videosContent = fs.readFileSync('src/data/videos.ts', 'utf8');
const shopsContent = fs.readFileSync('src/data/coffeeshops.ts', 'utf8');

// 2. Parsers
function parseVideos(content) {
    const videoMap = {}; // Title -> ID
    const regex = /"videoId":\s*"([^"]+)",\s*[\s\S]*?"title":\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        // Normalize title for matching: lowercase, trim
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

// 3. User Data (Hardcoded from input)
const rawTable = [
    ["#AMSTERDAM COFFEESHOPS *UNCENSORED CUT* TESTING MY NEW TITANIUM GADGET + + FOOD + HISTORY #vlog", "Coffeeshop Chapito, Coffeeshop 7th Heaven, Coffeeshop 137, Coffeeshop 77, Terps Army, The Bulldog"],
    ["AMSTERDAM'S HISTORY OF MADNESS + NEW COFFEESHOP + MUNCHIES", "Coffeeshop Carmona, Terps Army"],
    ["BEDROCAN IN 2024! THE MOST ANTICIPATED VIDEO OF 2024?", ""],
    ["CINEMATIC STRAIN REVIEW: CHOCOLATE DIESEL & TROPICANA CHERRY", "Coffeeshop Crush, Easy Times"],
    ["COFFEESHOPS OUTSIDE OF AMSTERDAM.. IS IT WORTH IT? + UNDERCOVER TEST!", "Coffeeshop Sativa"],
    ["Coffeeshops No One Is Talking About (Anymore)", "Coffeeshop Solo, The Jolly Joker, Coffeeshop Hashtag, Het Ballonnetje"],
    ["DOES THIS COFFEESHOP AWARDS ENTRY DELIVER?", "African Black Star"],
    ["First Time In Amsterdam? 3 Coffeeshops For A Quick Arrival (Less Than 10 Min Walking from Central)", "Coffeeshop Amsterdam, Barney's Farm, Amnesia Coffeeshop, Coffeeshop Siberië"],
    ["From AMSTERDAM To LEGAL FLOWER in 15 MINUTES (Step By Step TUTORIAL)+ MUNCHIES + Best SPOTS to CHILL", "Coffeeshop Headlines"],
    ["German MEDICINAL FLOWER (34%) Tutorial & Test (400+ STRAINS) From Online Prescription To Delivery", ""],
    ["I BOUGHT FLOWER FROM SOME OF AMSTERDAM'S BEST COFFEESHOPS", "African Black Star, Coffeeshop The H, Coffeeshop Hashtag, Coffeeshop 137, Family First"],
    ["I BOUGHT THESE 5 LEGAL FLOWERS IN A COFFEESHOP NEXT TO #AMSTERDAM", "Coffeeshop in Almere"], // "Coffeeshop in Almere" is vague, might ignore or log
    ["I Tested Coffeeshops I Have Never Visited Before (Piatella for 22€ ? ) + Food", "Coffeeshop Freedom, Coffeeshop Actama, Coffeeshop Happy Feelings, Coffeeshop Bagira"],
    ["I Tested My Favorite Coffeeshops in Amsterdam (Undercover) (Gone Wrong, Again..)", "Coffeeshop Chapito, Coffeeshop Bagira, Coffeeshop Hashtag"],
    ["Lemon Kush x Cherry Zkittlez! Does this work? Oh hell YEAH", "Coffeeshop Sativa, Coffeeshop 137"],
    ["NEW Drive-Through Coffeeshop in Utrecht + NEW McDonald's Sandwiches vlog #002", "Drive-Thru Coffeeshop in Utrecht"], // Vague
    ["SEEKING AN O.G. IN #AMSTERDAM + RED LIGHT DISTRICT SHOTS + MUNCHIES + HISTORY #vlog #003", "Coffeeshop Goa, Greenhouse, Coffeeshop Crush, Coffeeshop Flower Power, Coffeeshop 137, Easy Times, Coffeeshop De Graal"],
    ["TESTING MY NEW TITANIUM GADGET IN #AMSTERDAM @COFFEESHOP 7TH HEAVEN + FOOD + HISTORY + BIKING #vlog", "Coffeeshop Chapito, Coffeeshop 7th Heaven, Coffeeshop 137, Coffeeshop 77, Terps Army"],
    ["THE BEST COFFEESHOPS IN #AMSTERDAM 2025 (NO NONSENSE)", "Green Place, Coffeeshop The H, Coffeeshop Sativa, Coffeeshop Prix, Family First, Coffeeshop Chapito, Coffeeshop 7th Heaven, Coffeeshop 137, Terps Army, The Plaque, New Times, Coffeeshop Reefer"], // Note: title mismatch "COFFEESHOPS" vs "COFFEESHOP" in user table vs file? I'll use fuzzy or exact match.
    ["THIS COFFEESHOP'S MOST EXPENSIVE ITEM IS 12.50 + THE MUNCHIES #amsterdam vlog #1", "Coffeeshop Relax, Popeye, Spies, Greenhouse, L from the Land, Barney's Farm, Coffeeshop Het Schip, Family First, Coffeeshop Prix, The Bulldog"],
    ["The BEST Coffeeshops in #AMSTERDAM 2025 (SUMMER EDITION)", "Terps Army, Family First, Easy Times, Green Place"],
    ["The BEST Coffeeshops in #AMSTERDAM 2025 (SUMMER EDITION) *NPC CUT*", "Terps Army, Family First, Easy Times, Green Place"],
    ["The Ice Cream Cake Everyone's Sleeping On", "Coffeeshop Sativa, Coffeeshop 137"],
    ["This Rainbow Lava Belongs Into The Vulcano", "Coffeeshop 137, Coffeeshop Sativa"],
    ["VISITING My Viewers COFFEESHOP Recommendations In AMSTERDAM Part 2 + FOOD + PARKS", "Coffeeshop Bullwicki, Easy Times, Coffeeshop Get Down, Coffeeshop Yoyo"],
    ["VISITING My Viewers COFFEESHOP Recommendations in AMSTERDAM + Food + GIVEAWAY", "Coffeeshop The Stud, Coffeeshop Mr. K, Coffeeshop DNA, Coffeeshop Katsu, Barney's Farm"],
    ["Visiting The Worst Reviewed Coffeeshops In Amsterdam (GONE WRONG) + Food + History", "Coffeeshop Baraka, Coffeeshop Rocket, Coffeeshop Bullwicki, Coffeeshop City Hall"],
    ["What Can You Get For 10 € In Amsterdam Coffeeshops in The Year 2025", "Coffeeshop Flower Power, Coffeeshop Catch 33, African Black Star, Coffeeshop Boerejongens, Easy Times, Coffeeshop Bagira, Coffeeshop Sharing"]
];

// Helper to fuzzy find shop ID
function findShopId(name) {
    const n = name.toLowerCase().replace("coffeeshop ", "").trim();

    // Direct match
    if (shopNameToId[n]) return shopNameToId[n];

    // Try matching against keys containing the search term
    const keys = Object.keys(shopNameToId);
    const matches = keys.filter(k => k.includes(n) || n.includes(k));

    // Specific fixes for known mismatches based on typical data issues
    if (n === "137") return shopNameToId["137"];
    if (n === "amsterdam") return shopNameToId["coffeeshopamsterdam"];
    if (n === "siberië") return shopNameToId["siberie"];
    if (n === "barney's farm") return shopNameToId["barney's"]; // or similar
    if (n === "greenhouse") return shopNameToId["green house"]; // check this

    if (matches.length > 0) return shopNameToId[matches[0]]; // Return first match

    return null;
}

// 4. Processing
const operations = []; // { shopId: string, videoIds: string[] }
const shopVideoMap = {}; // ShopID -> Set<VideoID>

rawTable.forEach(([title, shopsStr]) => {
    if (!shopsStr || shopsStr.trim() === "" || shopsStr.includes("None mentioned")) return;

    const t = title.trim().toLowerCase();
    const videoId = videoTitleToId[t];

    if (!videoId) {
        console.log(`⚠️ Video Title Not Found: "${title}"`);
        return;
    }

    const shopNames = shopsStr.split(',').map(s => s.trim());
    shopNames.forEach(sName => {
        const shopId = findShopId(sName);
        if (shopId) {
            if (!shopVideoMap[shopId]) shopVideoMap[shopId] = new Set();
            shopVideoMap[shopId].add(videoId);
        } else {
            console.log(`⚠️ Shop Not Found: "${sName}" (Video: ${videoId})`);
        }
    });
});

console.log("\n--- Generated Updates ---");
console.log(JSON.stringify(
    Object.entries(shopVideoMap).map(([shopId, vIds]) => ({
        shopId,
        videoIds: Array.from(vIds)
    })),
    null, 2
));
