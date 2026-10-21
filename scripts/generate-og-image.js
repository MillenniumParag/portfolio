import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function generateOgImage() {
  const uploadsDir = path.resolve("./src/uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="50%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#0a0f1d" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.7" opacity="0.35"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="1200" height="8" fill="url(#accent)" />

    <!-- Content Container -->
    <g transform="translate(100, 100)">
      <!-- Badge -->
      <rect x="0" y="0" width="360" height="40" rx="20" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5" />
      <circle cx="20" cy="20" r="5" fill="#10b981" />
      <text x="35" y="25" fill="#34d399" font-family="system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="1">
        CLASS OF 2026 • OPEN TO WORK
      </text>

      <!-- Brand -->
      <text x="0" y="115" fill="#ffffff" font-family="system-ui, sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5">
        Parag<tspan fill="#10b981">.dev</tspan>
      </text>

      <!-- Headline -->
      <text x="0" y="175" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="28" font-weight="600">
        Computer Science Graduate &amp; Junior Software Engineer
      </text>

      <text x="0" y="225" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="20" font-weight="400">
        Building high-performance full-stack web applications, distributed systems, &amp; modern APIs.
      </text>

      <!-- Tech Stack Badges -->
      <g transform="translate(0, 290)">
        <!-- Tag 1 -->
        <rect x="0" y="0" width="125" height="36" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="62.5" y="23" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">TypeScript</text>

        <!-- Tag 2 -->
        <rect x="137" y="0" width="105" height="36" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="189.5" y="23" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">Next.js</text>

        <!-- Tag 3 -->
        <rect x="254" y="0" width="80" height="36" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="294" y="23" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">Go</text>

        <!-- Tag 4 -->
        <rect x="346" y="0" width="120" height="36" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="406" y="23" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">PostgreSQL</text>

        <!-- Tag 5 -->
        <rect x="478" y="0" width="120" height="36" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="538" y="23" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">Tailwind v4</text>

        <!-- Tag 6 -->
        <rect x="610" y="0" width="110" height="36" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="665" y="23" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">daisyUI v5</text>
      </g>

      <!-- Bottom Meta -->
      <g transform="translate(0, 390)">
        <text x="0" y="0" fill="#64748b" font-family="monospace" font-size="16">
          https://parag.dev • Portfolio • Case Studies • Technical Blog
        </text>
      </g>
    </g>
  </svg>
  `;

  const outputPath = path.resolve(uploadsDir, "og-default.png");
  await sharp(Buffer.from(svg))
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(outputPath);

  console.log(`[SEO] Generated OG Image at: ${outputPath}`);
}

generateOgImage();
