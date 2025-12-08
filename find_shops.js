const fs = require('fs');
const content = fs.readFileSync('src/data/coffeeshops.ts', 'utf8');
const regex = /{[\s\S]*?"id":\s*"([^"]+)",[\s\S]*?"name":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
    const id = match[1];
    const name = match[2];
    if (/Super|Skunk|Saint|Babylon/i.test(name)) {
        console.log(`${id}: ${name}`);
    }
}
