import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Multi-stop Radiant Emerald Gradient -->
    <linearGradient id="emeraldBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="35%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>

    <!-- Ambient Top-Gloss Reflection -->
    <linearGradient id="glossHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.32" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>

    <!-- Dimensional Shadow for the Monogram -->
    <filter id="emblemShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#022c22" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Squircle Base (Apple/macOS 120px curvature) -->
  <rect width="512" height="512" rx="120" fill="url(#emeraldBg)" />
  <rect x="6" y="6" width="500" height="500" rx="114" fill="none" stroke="url(#glossHighlight)" stroke-width="6" />

  <!-- Architectural 'P' Monogram -->
  <g filter="url(#emblemShadow)">
    <path
      fill="#ffffff"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M 148 142 C 148 127.6 159.6 116 174 116 L 278 116 C 336 116 364 149 364 214 C 364 279 336 312 278 312 L 228 312 L 228 370 C 228 384.4 216.4 396 202 396 L 174 396 C 159.6 396 148 384.4 148 370 Z M 228 184 L 270 184 C 294 184 304 195 304 214 C 304 233 294 244 270 244 L 228 244 Z"
    />
  </g>
</svg>`;

async function generateFavicons() {
  const srcDir = path.resolve("./src");
  const svgPath = path.join(srcDir, "favicon.svg");

  // 1. Write the new SVG favicon
  fs.writeFileSync(svgPath, faviconSvg, "utf8");
  console.log("✓ Saved src/favicon.svg");

  const svgBuffer = Buffer.from(faviconSvg);

  // 2. Generate 32x32 PNG
  const p32 = path.join(srcDir, "favicon-32x32.png");
  await sharp(svgBuffer).resize(32, 32).png().toFile(p32);
  console.log("✓ Generated src/favicon-32x32.png");

  // 3. Generate 16x16 PNG
  const p16 = path.join(srcDir, "favicon-16x16.png");
  await sharp(svgBuffer).resize(16, 16).png().toFile(p16);
  console.log("✓ Generated src/favicon-16x16.png");

  // 4. Generate 180x180 Apple Touch Icon
  const applePath = path.join(srcDir, "apple-touch-icon.png");
  await sharp(svgBuffer).resize(180, 180).png().toFile(applePath);
  console.log("✓ Generated src/apple-touch-icon.png");

  // 5. Generate favicon.ico (32x32 standard ICO header container)
  const icoPath = path.join(srcDir, "favicon.ico");
  // Standard ICO container wrapping 32x32 PNG image
  const png32Buffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // Number of images

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0); // Width 32
  icoEntry.writeUInt8(32, 1); // Height 32
  icoEntry.writeUInt8(0, 2);  // Color palette 0
  icoEntry.writeUInt8(0, 3);  // Reserved
  icoEntry.writeUInt16LE(1, 4); // Color planes
  icoEntry.writeUInt16LE(32, 6); // Bits per pixel
  icoEntry.writeUInt32LE(png32Buffer.length, 8); // Image size in bytes
  icoEntry.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

  const icoData = Buffer.concat([icoHeader, icoEntry, png32Buffer]);
  fs.writeFileSync(icoPath, icoData);
  console.log("✓ Generated src/favicon.ico");
}

generateFavicons();
