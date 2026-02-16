# Red Water — Band Website

A React band site for **Red Water** (Pacific Northwest). Only images from `public/gallery/` and `public/merch/` are used — no external or placeholder images.

## Run locally

```bash
npm install
npm run dev
```

Before each `dev` or `build`, the project scans `public/gallery` and `public/merch` and updates `src/assetPaths.js` with the list of image paths. Add or remove images in those folders and run `npm run dev` again to refresh.

## Where to add images

- **Gallery:** Put band photos in `public/gallery/` (e.g. `public/gallery/photo1.jpg`). They appear in the Gallery section and the first image is used as the hero background.
- **Merch:** Put product photos in `public/merch/` (e.g. `public/merch/tshirt.png`). Add name, description, and price in `src/data.js` under `merchDetails` (key = filename).

## Build for production

```bash
npm run build
```

Preview the build with `npm run preview`.
