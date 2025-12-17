# Manual Update Guide

Follow these steps to update the YouTube and Instagram data on the website.

## Prerequisites
- Ensure you have the latest data files.
- Ensure you are in the project root directory in your terminal.

## Updating YouTube Data

1. **Prepare Data**:
   - Save your scraped YouTube data as `youtube-data-shorts.json` (for shorts) or `youtube-data.json` (for videos) in the root directory of the project.
   - **Note**: The script detects which file exists. If updating shorts, ensure `youtube-data-shorts.json` is present.

2. **Run Script**:
   - Open your terminal.
   - Run the following command:
     ```bash
     node scripts/update-youtube.js
     ```

3. **Verify**:
   - Check the output for "Successfully updated src/data/shorts.ts" (or `videos.ts`).
   - You can also check the `src/data/shorts.ts` file to see if the new items were added at the top.

## Updating Instagram Data

1. **Prepare Data**:
   - Save your scraped Instagram data as `instagram-data.json` in the root directory.

2. **Run Script**:
   - Open your terminal.
   - Run the following command:
     ```bash
     node scripts/update-instagram.js
     ```
   - This script will:
     - Download new images to `public/images/instagram`.
     - Update `src/data/instagram.ts`.
     - Update `.instagram-history.json` to prevent duplicates in the future.

3. **Verify**:
   - Check the output for success messages.
   - Verify that new images have appeared in `public/images/instagram`.

## Troubleshooting

- **"Module not found" error**: If you see an error about missing modules (e.g., `puppeteer`), try running `npm install`.
- **"No data file found"**: Make sure your JSON files are named correctly and placed in the root directory (not in `src` or `scripts`).

## Updating Shop Images (Bulk Process)

If you have uploaded new images to `public/images/shops` and want to replace placeholder SVG files:

1. **Upload Images**:
   - Ensure new images are in `public/images/shops`.

2. **Find Remaining SVGs**:
   - Run to see how many shops still need updates:
     ```bash
     node scripts/find-svg-shops.js
     ```

3. **Check for Matches**:
   - Run this to see what the script *would* update (dry run):
     ```bash
     node scripts/match-new-images.js
     ```

4. **Apply Updates**:
   - **WARNING**: This modifies `src/data/coffeeshops.ts`. Make sure you have committed previous changes first!
   - Run to apply the changes:
     ```bash
     node scripts/match-and-replace.js
     ```
   - If something goes wrong, you can undo with `git checkout src/data/coffeeshops.ts`.

## Git Operations
 
### 1. Sync with Remote (Pull)
Before starting new updates, it's good practice to ensure you have the latest version of the code.
```bash
git pull
```

### 2. Save Changes (Push)
Once you have verified your updates, you need to save them to the repository.

1. **Stage Changes**:
   ```bash
   git add .
   ```

2. **Commit Changes**:
   ```bash
   git commit -m "Update social media data"
   ```

3. **Push to Remote**:
   ```bash
   git push
   ```
