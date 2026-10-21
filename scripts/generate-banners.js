import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const uploadsDir = path.resolve("./src/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const banners = [
  {
    filename: "banner-telemetry.png",
    bgStart: "#030712",
    bgEnd: "#111827",
    accent: "#06b6d4",
    title: "Sub-Second Telemetry Pipelines",
    subtitle: "High-Throughput Streaming with Go, Protobuf & ClickHouse",
    tag: "SYSTEMS ARCHITECTURE",
    icon: "⚡",
    pattern: "crosses"
  },
  {
    filename: "banner-tailwind-daisyui.png",
    bgStart: "#064e3b",
    bgEnd: "#022c22",
    accent: "#10b981",
    title: "Tailwind CSS v4 & daisyUI v5",
    subtitle: "Zero-Config Modern Styling & Semantic UI Components",
    tag: "FRONTEND ENGINEERING",
    icon: "🌼",
    pattern: "dots"
  },
  {
    filename: "banner-decap-cms.png",
    bgStart: "#1e1b4b",
    bgEnd: "#0f172a",
    accent: "#818cf8",
    title: "Git-Driven Content with Decap CMS",
    subtitle: "Serverless Jamstack Editorial Publishing on Netlify",
    tag: "JAMSTACK & DEVOPS",
    icon: "🚀",
    pattern: "grid"
  },
  {
    filename: "project-cloudscale.png",
    bgStart: "#0f172a",
    bgEnd: "#0284c7",
    accent: "#38bdf8",
    title: "CloudScale Analytics Engine",
    subtitle: "Distributed Telemetry & High-Speed Analytics Dashboard",
    tag: "SYSTEMS & BACKEND",
    icon: "📊",
    pattern: "grid"
  },
  {
    filename: "project-devpulse.png",
    bgStart: "#18181b",
    bgEnd: "#7c3aed",
    accent: "#a78bfa",
    title: "DevPulse AI Suite",
    subtitle: "Automated PR Code Analysis & Senior Capstone Tool",
    tag: "AI & FULL STACK",
    icon: "🤖",
    pattern: "dots"
  },
  {
    filename: "project-luminaui.png",
    bgStart: "#064e3b",
    bgEnd: "#0f766e",
    accent: "#2dd4bf",
    title: "Lumina UI Component Kit",
    subtitle: "Accessible Multi-Theme Component System with daisyUI",
    tag: "DESIGN SYSTEMS",
    icon: "🎨",
    pattern: "crosses"
  },
  {
    filename: "project-flashkv.png",
    bgStart: "#450a0a",
    bgEnd: "#1f2937",
    accent: "#f87171",
    title: "FlashKV Distributed Store",
    subtitle: "In-Memory Key-Value Store with Raft Consensus in Go",
    tag: "DISTRIBUTED SYSTEMS",
    icon: "💾",
    pattern: "grid"
  }
];

function escapeXml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSvg(b) {
  const safeTitle = escapeXml(b.title);
  const safeSubtitle = escapeXml(b.subtitle);
  const safeTag = escapeXml(b.tag);

  return `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${b.filename}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${b.bgStart}" />
        <stop offset="100%" stop-color="${b.bgEnd}" />
      </linearGradient>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${b.accent}" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" stroke-width="0.8" opacity="0.15"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#grad-${b.filename})" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="1200" height="8" fill="url(#lineGrad)" />

    <!-- Decorative Glow Circles -->
    <circle cx="1050" cy="150" r="220" fill="${b.accent}" opacity="0.12" />
    <circle cx="150" cy="500" r="180" fill="${b.accent}" opacity="0.08" />

    <!-- Content Group -->
    <g transform="translate(90, 110)">
      <!-- Pill Badge -->
      <rect x="0" y="0" width="280" height="38" rx="19" fill="${b.accent}" fill-opacity="0.15" stroke="${b.accent}" stroke-width="1.5" />
      <text x="140" y="24" fill="${b.accent}" font-family="system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5" text-anchor="middle">
        ${safeTag}
      </text>

      <!-- Title -->
      <text x="0" y="115" fill="#ffffff" font-family="system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-1">
        ${safeTitle}
      </text>

      <!-- Subtitle -->
      <text x="0" y="175" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="24" font-weight="500">
        ${safeSubtitle}
      </text>

      <!-- Visual Code / Terminal Window Box -->
      <g transform="translate(0, 240)">
        <rect x="0" y="0" width="1020" height="150" rx="16" fill="#030712" fill-opacity="0.65" stroke="#334155" stroke-width="1.5" />
        <circle cx="28" cy="24" r="6" fill="#ef4444" />
        <circle cx="48" cy="24" r="6" fill="#f59e0b" />
        <circle cx="68" cy="24" r="6" fill="#10b981" />
        <line x1="0" y1="44" x2="1020" y2="44" stroke="#1e293b" stroke-width="1" />
        
        <text x="28" y="85" fill="${b.accent}" font-family="monospace" font-size="18" font-weight="700">
          ➜  Parag.dev / ${b.filename.replace(/\.png$/, '')}
        </text>
        <text x="28" y="118" fill="#94a3b8" font-family="monospace" font-size="15">
          ✓ Production Grade  •  ✓ WCAG Accessible  •  ✓ High Performance Web
        </text>
      </g>
    </g>
  </svg>
  `;
}

async function run() {
  for (const b of banners) {
    const svgStr = buildSvg(b);
    const dest = path.join(uploadsDir, b.filename);
    await sharp(Buffer.from(svgStr))
      .png({ quality: 90, compressionLevel: 8 })
      .toFile(dest);
    console.log(`Generated: ${dest}`);
  }
}

run();
