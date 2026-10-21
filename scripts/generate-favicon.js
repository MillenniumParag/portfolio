import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function generateFavicon() {
  const srcDir = path.resolve("./src");

  // Modern SVG Favicon with emerald gradient and clean bold 'P'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#064e3b" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#emeraldGrad)" />
  <rect width="504" height="504" x="4" y="4" rx="124" fill="none" stroke="#6ee7b7" stroke-width="8" stroke-opacity="0.3" />
  <text
    x="50%"
    y="52%"
    font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    font-size="340"
    font-weight="900"
    fill="#ffffff"
    text-anchor="middle"
    dominant-baseline="central"
    filter="url(#subtleShadow)"
  >P</text>
</svg>`;

  // 1. Write the vector SVG favicon to src/favicon.svg
  fs.writeFileSync(path.join(srcDir, "favicon.svg"), svg, "utf8");
  console.log("Created src/favicon.svg");

  const svgBuffer = Buffer.from(svg);

  // 2. Generate Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(srcDir, "apple-touch-icon.png"));
  console.log("Created src/apple-touch-icon.png (180x180)");

  // 3. Generate standard 32x32 PNG favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(srcDir, "favicon-32x32.png"));
  console.log("Created src/favicon-32x32.png (32x32)");

  // 4. Generate 16x16 PNG favicon
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(srcDir, "favicon-16x16.png"));
  console.log("Created src/favicon-16x16.png (16x16)");

  // 5. Generate standard 48x48 PNG (serves as favicon.ico companion)
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(srcDir, "favicon.ico"));
  console.log("Created src/favicon.ico (48x48 PNG format compatible with modern browsers)");
}

generateFavicon().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
