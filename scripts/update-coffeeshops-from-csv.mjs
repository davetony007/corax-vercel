import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple CSV parser
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
    if (entry.shop_name && entry.image_filename) {
      data.push(entry);
    }
  }
  
  return data;
}

// Parse a CSV line handling quoted fields
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

// Normalize names for matching
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
}

// Find shop in existing code by name
function findShopInCode(code, shopName) {
  const normalized = normalizeName(shopName);
  
  // Remove common prefixes for matching
  const nameWithoutPrefix = shopName.replace(/^(coffeeshop|the|de|het|'t)\s+/i, '').trim();
  const normalizedNoPrefix = normalizeName(nameWithoutPrefix);
  
  // Try multiple patterns for better matching
  const patterns = [
    // Exact match
    new RegExp(`name:\\s*"${shopName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'i'),
    // Contains the normalized name
    new RegExp(`name:\\s*"[^"]*${normalized}[^"]*"`, 'i'),
    // Try without common prefixes/suffixes (e.g., "City Hall" matches "Coffeeshop City Hall")
    new RegExp(`name:\\s*"[^"]*(?:Coffeeshop\\s+)?${normalizedNoPrefix}(?:\s*\([^)]+\))?[^"]*"`, 'i'),
    // Try with common variations (e.g., "7th Heaven" matches "7th Heaven (137)")
    new RegExp(`name:\\s*"[^"]*${normalizedNoPrefix}[^"]*"`, 'i'),
    // Try with common variations (plural/singular)
    new RegExp(`name:\\s*"[^"]*${normalized.replace(/s$/, '')}[^"]*"`, 'i'),
  ];
  
  for (const pattern of patterns) {
    const match = code.match(pattern);
    if (match) {
      return match.index;
    }
  }
  
  // Try partial matching - split name into significant words
  const significantWords = normalizedNoPrefix.match(/[a-z]{3,}|[0-9]+/g) || [];
  if (significantWords.length >= 2) {
    // Try matching with at least 2 significant words
    const wordPattern = significantWords.slice(0, 2).join('[^"]*');
    const partialPattern = new RegExp(`name:\\s*"[^"]*${wordPattern}[^"]*"`, 'i');
    const match = code.match(partialPattern);
    if (match) {
      return match.index;
    }
  }
  
  return -1;
}

// Update a shop entry in the code
function updateShopInCode(code, csvEntry) {
  const shopNamePos = findShopInCode(code, csvEntry.shop_name);
  
  if (shopNamePos === -1) {
    return { code, updated: false };
  }
  
  // Find the shop object boundaries
  let startPos = code.lastIndexOf('{', shopNamePos);
  if (startPos === -1) return { code, updated: false };
  
  // Find matching closing brace
  let braceCount = 0;
  let endPos = startPos;
  let inString = false;
  let escapeNext = false;
  
  for (let i = startPos; i < code.length; i++) {
    const char = code[i];
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    
    if (char === '"' && !escapeNext) {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          endPos = i + 1;
          break;
        }
      }
    }
  }
  
  if (endPos <= startPos) return { code, updated: false };
  
  const shopCode = code.substring(startPos, endPos);
  let updatedShopCode = shopCode;
  let changed = false;
  
  // Update coordinates
  if (csvEntry.latitude && csvEntry.longitude) {
    const lat = parseFloat(csvEntry.latitude);
    const lon = parseFloat(csvEntry.longitude);
    if (!isNaN(lat) && !isNaN(lon)) {
      const coordsPattern = /coordinates:\s*\[[\d.,\s]+\]/;
      if (coordsPattern.test(updatedShopCode)) {
        updatedShopCode = updatedShopCode.replace(
          coordsPattern,
          `coordinates: [${lat}, ${lon}]`
        );
        changed = true;
      }
    }
  }
  
  // Update address
  if (csvEntry.shop_address) {
    const escapedAddress = csvEntry.shop_address.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const addressPattern = /address:\s*"[^"]*"/;
    if (addressPattern.test(updatedShopCode)) {
      updatedShopCode = updatedShopCode.replace(
        addressPattern,
        `address: "${escapedAddress}"`
      );
      changed = true;
    } else {
      // Add address after name
      const nameMatch = updatedShopCode.match(/name:\s*"[^"]*"/);
      if (nameMatch) {
        const insertPos = nameMatch.index + nameMatch[0].length;
        updatedShopCode = updatedShopCode.slice(0, insertPos) + 
          `,\n    address: "${escapedAddress}"` +
          updatedShopCode.slice(insertPos);
        changed = true;
      }
    }
  }
  
  // Update menuImages
  if (csvEntry.image_filename) {
    const menuImagePath = `/menus/${csvEntry.image_filename}`;
    const menuImagesPattern = /menuImages:\s*\[[^\]]*\]/;
    if (menuImagesPattern.test(updatedShopCode)) {
      updatedShopCode = updatedShopCode.replace(
        menuImagesPattern,
        `menuImages: ["${menuImagePath}"]`
      );
      changed = true;
    } else {
      // Add menuImages after image field
      const imageMatch = updatedShopCode.match(/image:\s*"[^"]*"/);
      if (imageMatch) {
        const insertPos = imageMatch.index + imageMatch[0].length;
        updatedShopCode = updatedShopCode.slice(0, insertPos) + 
          `,\n    menuImages: ["${menuImagePath}"]` +
          updatedShopCode.slice(insertPos);
        changed = true;
      }
    }
  }
  
  if (changed) {
    const newCode = code.substring(0, startPos) + updatedShopCode + code.substring(endPos);
    return { code: newCode, updated: true };
  }
  
  return { code, updated: false };
}

// Main function
function main() {
  console.log('Reading CSV file...');
  const csvPath = path.join(__dirname, '../public/coffeeshop_data.csv');
  const csvData = parseCSV(csvPath);
  console.log(`Parsed ${csvData.length} CSV entries`);
  
  console.log('Reading coffeeshops.ts...');
  const coffeeshopsPath = path.join(__dirname, '../src/data/coffeeshops.ts');
  let coffeeshopsCode = fs.readFileSync(coffeeshopsPath, 'utf-8');
  
  // Group CSV entries by shop name (use most recent)
  const csvByShop = new Map();
  csvData.forEach(entry => {
    const key = normalizeName(entry.shop_name);
    if (!csvByShop.has(key) || 
        (entry.menu_date && csvByShop.get(key).menu_date < entry.menu_date)) {
      csvByShop.set(key, entry);
    }
  });
  
  console.log(`Processing ${csvByShop.size} unique shops...`);
  
  let updateCount = 0;
  let notFoundCount = 0;
  
  csvByShop.forEach((entry, key) => {
    const result = updateShopInCode(coffeeshopsCode, entry);
    if (result.updated) {
      coffeeshopsCode = result.code;
      updateCount++;
      console.log(`✓ Updated: ${entry.shop_name}`);
    } else {
      notFoundCount++;
      console.log(`✗ Not found: ${entry.shop_name}`);
    }
  });
  
  console.log(`\nSummary:`);
  console.log(`  Updated: ${updateCount}`);
  console.log(`  Not found: ${notFoundCount}`);
  
  // Write updated file
  console.log('\nWriting updated file...');
  fs.writeFileSync(coffeeshopsPath, coffeeshopsCode, 'utf-8');
  console.log('Done!');
}

main();

