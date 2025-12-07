import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CSV line handling quoted fields
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  
  return values;
}

// Parse CSV file
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) continue;
    
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = values[index]?.trim() || '';
    });
    
    // Only add if we have essential data
    if (entry.shop_name && entry.latitude && entry.longitude) {
      data.push(entry);
    }
  }
  
  return data;
}

// Generate coffeeshop entry from CSV row
function generateCoffeeshopEntry(csvEntry, index) {
  const lat = parseFloat(csvEntry.latitude);
  const lon = parseFloat(csvEntry.longitude);
  
  if (isNaN(lat) || isNaN(lon)) {
    return null;
  }
  
  // Use city as location, or derive from address
  const location = csvEntry.city || 'Unknown';
  
  // Generate menu image path
  const menuImagePath = csvEntry.image_filename 
    ? `/menus/${csvEntry.image_filename}`
    : null;
  
  // Default values for fields not in CSV
  const entry = {
    id: String(index + 1),
    name: csvEntry.shop_name,
    location: location,
    address: csvEntry.shop_address || '',
    coordinates: [lat, lon],
    rating: 0, // Default rating, can be updated later
    tags: [], // Empty tags, can be added later
    videoIds: [], // Empty video IDs, can be added later
    shortIds: [], // Empty short IDs, can be added later
    description: `Coffeeshop located in ${location}`,
    image: "/src/assets/review-1.jpg", // Default image
  };
  
  // Add menu image if available
  if (menuImagePath) {
    entry.menuImages = [menuImagePath];
  }
  
  return entry;
}

// Generate TypeScript file content
function generateTypeScriptFile(coffeeshops) {
  const interfaceCode = `export interface StrainReview {
  name: string;
  price?: string;
  rating?: string;
  notes: string;
}

export interface CoffeeshopData {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  rating: number;
  tags: string[];
  videoIds: string[]; // Array of YouTube video IDs featuring this shop
  shortIds: string[]; // Array of YouTube shorts IDs featuring this shop
  description: string;
  detailedReview?: string;
  strainReviews?: StrainReview[];
  image: string;
  address?: string;
  menuImages?: string[];
}

// Coffeeshop locations generated from CSV data
export const coffeeshops: CoffeeshopData[] = [
`;

  const shopsCode = coffeeshops.map((shop, index) => {
    const indent = '  ';
    let shopCode = `${indent}{\n`;
    shopCode += `${indent}  id: "${shop.id}",\n`;
    shopCode += `${indent}  name: "${shop.name.replace(/"/g, '\\"')}",\n`;
    shopCode += `${indent}  location: "${shop.location.replace(/"/g, '\\"')}",\n`;
    
    if (shop.address) {
      shopCode += `${indent}  address: "${shop.address.replace(/"/g, '\\"')}",\n`;
    }
    
    shopCode += `${indent}  coordinates: [${shop.coordinates[0]}, ${shop.coordinates[1]}],\n`;
    shopCode += `${indent}  rating: ${shop.rating},\n`;
    shopCode += `${indent}  tags: ${JSON.stringify(shop.tags)},\n`;
    shopCode += `${indent}  videoIds: ${JSON.stringify(shop.videoIds)},\n`;
    shopCode += `${indent}  shortIds: ${JSON.stringify(shop.shortIds)},\n`;
    shopCode += `${indent}  description: "${shop.description.replace(/"/g, '\\"')}",\n`;
    shopCode += `${indent}  image: "${shop.image}",\n`;
    
    if (shop.menuImages && shop.menuImages.length > 0) {
      shopCode += `${indent}  menuImages: ${JSON.stringify(shop.menuImages)},\n`;
    }
    
    shopCode += `${indent}}`;
    return shopCode;
  }).join(',\n');

  const filterTagsCode = `
];

export const filterTags = [
  "All",
  "Top Pick",
  "Tourist Friendly",
  "Local Favorite",
  "Quality Focus",
  "Good Prices",
  "Unique Vibe",
  "Historic"
];
`;

  return interfaceCode + shopsCode + filterTagsCode;
}

// Main function
function main() {
  console.log('Reading CSV file...');
  const csvPath = path.join(__dirname, '../public/coffeeshop_data.csv');
  const csvData = parseCSV(csvPath);
  console.log(`Parsed ${csvData.length} CSV entries`);
  
  // Remove duplicates (keep most recent based on menu_date or scraped_date)
  const uniqueShops = new Map();
  csvData.forEach(entry => {
    const key = entry.shop_name.toLowerCase().trim();
    const existing = uniqueShops.get(key);
    
    if (!existing) {
      uniqueShops.set(key, entry);
    } else {
      // Keep the one with more recent date
      const existingDate = existing.menu_date || existing.scraped_date || '';
      const currentDate = entry.menu_date || entry.scraped_date || '';
      if (currentDate > existingDate) {
        uniqueShops.set(key, entry);
      }
    }
  });
  
  console.log(`Found ${uniqueShops.size} unique shops (removed ${csvData.length - uniqueShops.size} duplicates)`);
  
  // Generate coffeeshop entries
  const coffeeshops = [];
  let index = 0;
  
  uniqueShops.forEach((entry) => {
    const shop = generateCoffeeshopEntry(entry, index);
    if (shop) {
      coffeeshops.push(shop);
      index++;
    }
  });
  
  console.log(`Generated ${coffeeshops.length} coffeeshop entries`);
  
  // Generate TypeScript file
  console.log('Generating TypeScript file...');
  const tsContent = generateTypeScriptFile(coffeeshops);
  
  // Write to file
  const outputPath = path.join(__dirname, '../src/data/coffeeshops.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  console.log(`✓ Generated new coffeeshops.ts with ${coffeeshops.length} shops`);
  console.log(`  File: ${outputPath}`);
}

main();

