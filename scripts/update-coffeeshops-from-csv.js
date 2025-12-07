import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and parse CSV
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = [];
    let currentValue = '';
    let inQuotes = false;
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());
    
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = values[index] || '';
    });
    data.push(entry);
  }
  
  return data;
}

// Normalize shop name for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
}

// Find matching shop in existing data
function findMatchingShop(csvEntry, existingShops) {
  const csvName = normalizeName(csvEntry.shop_name);
  const csvAddress = csvEntry.shop_address?.toLowerCase() || '';
  
  // Try exact name match first
  let match = existingShops.find(shop => 
    normalizeName(shop.name) === csvName
  );
  
  if (match) return match;
  
  // Try partial name match
  match = existingShops.find(shop => {
    const shopName = normalizeName(shop.name);
    return shopName.includes(csvName) || csvName.includes(shopName);
  });
  
  if (match) return match;
  
  // Try address match
  if (csvEntry.shop_address) {
    match = existingShops.find(shop => {
      const shopAddress = (shop.address || '').toLowerCase();
      return shopAddress && (
        shopAddress.includes(csvAddress) || 
        csvAddress.includes(shopAddress)
      );
    });
  }
  
  return match;
}

// Read existing coffeeshops.ts file
function readCoffeeshopsFile() {
  const filePath = path.join(__dirname, '../src/data/coffeeshops.ts');
  return fs.readFileSync(filePath, 'utf-8');
}

// Update coffeeshops data
function updateCoffeeshopsData() {
  const csvPath = path.join(__dirname, '../public/coffeeshop_data.csv');
  const csvData = parseCSV(csvPath);
  
  // Read and parse existing coffeeshops.ts
  const coffeeshopsFile = readCoffeeshopsFile();
  
  // Extract the coffeeshops array content
  const arrayStart = coffeeshopsFile.indexOf('export const coffeeshops: CoffeeshopData[] = [');
  const arrayEnd = coffeeshopsFile.lastIndexOf('];');
  
  if (arrayStart === -1 || arrayEnd === -1) {
    console.error('Could not find coffeeshops array in file');
    return;
  }
  
  // Extract existing shops (simplified - we'll need to parse properly)
  const existingShopsCode = coffeeshopsFile.substring(arrayStart, arrayEnd + 2);
  
  // Parse existing shops using eval (in a safe way)
  // We'll use a different approach - read the file as a module
  const shopsMatch = coffeeshopsFile.match(/export const coffeeshops: CoffeeshopData\[\] = (\[[\s\S]*?\]);/);
  if (!shopsMatch) {
    console.error('Could not parse coffeeshops array');
    return;
  }
  
  // We'll need to update the file directly by replacing shop entries
  let updatedFile = coffeeshopsFile;
  let updateCount = 0;
  let newShops = [];
  
  // Group CSV entries by shop name (handle duplicates)
  const csvByShop = new Map();
  csvData.forEach(entry => {
    const key = normalizeName(entry.shop_name);
    if (!csvByShop.has(key)) {
      csvByShop.set(key, []);
    }
    csvByShop.get(key).push(entry);
  });
  
  // Update existing shops
  csvByShop.forEach((entries, normalizedName) => {
    // Use the most recent entry (last in array or by date)
    const entry = entries[entries.length - 1];
    
    // Find matching shop
    const shopNamePattern = new RegExp(
      `name:\\s*"([^"]*${entry.shop_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"]*)"`,
      'i'
    );
    
    const match = updatedFile.match(shopNamePattern);
    if (match) {
      // Find the shop object
      const shopStart = updatedFile.lastIndexOf('{', match.index);
      let braceCount = 0;
      let shopEnd = shopStart;
      
      for (let i = shopStart; i < updatedFile.length; i++) {
        if (updatedFile[i] === '{') braceCount++;
        if (updatedFile[i] === '}') {
          braceCount--;
          if (braceCount === 0) {
            shopEnd = i + 1;
            break;
          }
        }
      }
      
      if (shopEnd > shopStart) {
        const shopCode = updatedFile.substring(shopStart, shopEnd);
        
        // Update coordinates
        let updatedShopCode = shopCode;
        if (entry.latitude && entry.longitude) {
          const coordsPattern = /coordinates:\s*\[[\d.,\s]+\]/;
          updatedShopCode = updatedShopCode.replace(
            coordsPattern,
            `coordinates: [${parseFloat(entry.latitude)}, ${parseFloat(entry.longitude)}]`
          );
        }
        
        // Update address
        if (entry.shop_address) {
          const addressPattern = /address:\s*"[^"]*"/;
          if (addressPattern.test(updatedShopCode)) {
            updatedShopCode = updatedShopCode.replace(
              addressPattern,
              `address: "${entry.shop_address.replace(/"/g, '\\"')}"`
            );
          } else {
            // Add address if it doesn't exist (before coordinates or after name)
            const nameMatch = updatedShopCode.match(/name:\s*"[^"]*"/);
            if (nameMatch) {
              const insertPos = nameMatch.index + nameMatch[0].length;
              updatedShopCode = updatedShopCode.slice(0, insertPos) + 
                `,\n    address: "${entry.shop_address.replace(/"/g, '\\"')}"` +
                updatedShopCode.slice(insertPos);
            }
          }
        }
        
        // Update menuImages
        const menuImagePath = `/menus/${entry.image_filename}`;
        const menuImagesPattern = /menuImages:\s*\[[^\]]*\]/;
        if (menuImagesPattern.test(updatedShopCode)) {
          updatedShopCode = updatedShopCode.replace(
            menuImagesPattern,
            `menuImages: ["${menuImagePath}"]`
          );
        } else {
          // Add menuImages if it doesn't exist
          const imageMatch = updatedShopCode.match(/image:\s*"[^"]*"/);
          if (imageMatch) {
            const insertPos = imageMatch.index + imageMatch[0].length;
            updatedShopCode = updatedShopCode.slice(0, insertPos) + 
              `,\n    menuImages: ["${menuImagePath}"]` +
              updatedShopCode.slice(insertPos);
          }
        }
        
        updatedFile = updatedFile.substring(0, shopStart) + 
          updatedShopCode + 
          updatedFile.substring(shopEnd);
        updateCount++;
      }
    } else {
      // New shop - we'll collect these
      newShops.push(entry);
    }
  });
  
  console.log(`Updated ${updateCount} existing shops`);
  console.log(`Found ${newShops.length} new shops in CSV`);
  
  // Write updated file
  const outputPath = path.join(__dirname, '../src/data/coffeeshops.ts');
  fs.writeFileSync(outputPath, updatedFile, 'utf-8');
  console.log(`Updated file: ${outputPath}`);
}

// Run the update
updateCoffeeshopsData();

