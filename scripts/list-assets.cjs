/**
 * Scans public/gallery and public/merch and writes paths to src/assetPaths.js.
 * Run before dev/build so the site only uses your local images.
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const galleryDir = path.join(projectRoot, 'public', 'gallery');
const merchDir = path.join(projectRoot, 'public', 'merch');

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => imageExtensions.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => '/' + path.relative(path.join(projectRoot, 'public'), path.join(dir, f)).replace(/\\/g, '/'));
}

const galleryImages = listImages(galleryDir);
const merchImages = listImages(merchDir);

const out = `// Auto-generated from public/gallery and public/merch. Run "npm run dev" or "npm run build" to update.
export const galleryImages = ${JSON.stringify(galleryImages, null, 2)};
export const merchImages = ${JSON.stringify(merchImages, null, 2)};
`;

fs.writeFileSync(path.join(projectRoot, 'src', 'assetPaths.js'), out, 'utf8');
console.log('Asset paths updated:', galleryImages.length, 'gallery', merchImages.length, 'merch');
