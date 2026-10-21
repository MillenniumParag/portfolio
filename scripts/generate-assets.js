import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const uploadsDir = path.resolve("./src/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const assets = [
  {
    filename: "project-aws-pipeline.webp",
    bgStart: "#064e3b",
    bgEnd: "#022c22",
    accent: "#10b981",
    tag: "CLOUD & DEVOPS",
    title: "AWS CI/CD Pipeline",
    subtitle: "Automated Deployments & Cloud Architecture",
    icon: "☁️"
  },
  {
    filename: "project-sap-abap.webp",
    bgStart: "#0f172a",
    bgEnd: "#1e1b4b",
    accent: "#38bdf8",
    tag: "SYSTEMS & ENTERPRISE",
    title: "SAP ABAP Data System",
    subtitle: "Internal Tables, Reports & ERP Workflows",
    icon: "🏢"
  },
  {
    filename: "project-dsa-c.webp",
    bgStart: "#18181b",
    bgEnd: "#27272a",
    accent: "#f59e0b",
    tag: "CORE COMPUTER SCIENCE",
    title: "DSA in C Benchmarks",
    subtitle: "Trees, Graphs & Dynamic Memory Management",
    icon: "⚡"
  },
  {
    filename: "project-spring-react.webp",
    bgStart: "#042f2e",
    bgEnd: "#111827",
    accent: "#14b8a6",
    tag: "FULL STACK WEB",
    title: "Spring Boot & React",
    subtitle: "REST APIs, JWT Security & Relational SQL",
    icon: "🚀"
  },
  {
    filename: "banner-daisyui-tailwind.webp",
    bgStart: "#064e3b",
    bgEnd: "#065f46",
    accent: "#34d399",
    tag: "FRONTEND ENGINEERING",
    title: "daisyUI v5 + Tailwind v4",
    subtitle: "Modern Design Systems & Clean Semantic UI",
    icon: "🌼"
  },
  {
    filename: "banner-aws-cicd.webp",
    bgStart: "#0c4a6e",
    bgEnd: "#082f49",
    accent: "#38bdf8",
    tag: "CLOUD INFRASTRUCTURE",
    title: "Automating CI/CD on AWS",
    subtitle: "From Git Triggers to Production Deployments",
    icon: "🛠️"
  },
  {
    filename: "banner-c-memory.webp",
    bgStart: "#312e81",
    bgEnd: "#1e1b4b",
    accent: "#a5b4fc",
    tag: "SYSTEMS PROGRAMMING",
    title: "Memory & Pointers in C",
    subtitle: "Deep Dive into Allocation & Cache Locality",
    icon: "🧠"
  }
];

function escapeXml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSvg(item) {
  const safeTitle = escapeXml(item.title);
  const safeSubtitle = escapeXml(item.subtitle);
  const safeTag = escapeXml(item.tag);

  return `
  <svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${path.parse(item.filename).name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${item.bgStart}" />
        <stop offset="100%" stop-color="${item.bgEnd}" />
      </linearGradient>
      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.08"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="800" height="500" fill="url(#grad-${path.parse(item.filename).name})" />
    <rect width="800" height="500" fill="url(#grid)" />

    <!-- Top Accent Bar -->
    <rect x="0" y="0" width="800" height="6" fill="${item.accent}" />

    <!-- Decorative Glow Circles -->
    <circle cx="700" cy="120" r="160" fill="${item.accent}" opacity="0.15" />
    <circle cx="100" cy="400" r="120" fill="${item.accent}" opacity="0.1" />

    <!-- Card Content -->
    <g transform="translate(60, 80)">
      <!-- Pill Badge -->
      <rect x="0" y="0" width="230" height="32" rx="16" fill="${item.accent}" fill-opacity="0.15" stroke="${item.accent}" stroke-width="1.2" />
      <text x="115" y="21" fill="${item.accent}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1.2" text-anchor="middle">
        ${safeTag}
      </text>

      <!-- Title -->
      <text x="0" y="95" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="900" letter-spacing="-0.5">
        ${safeTitle}
      </text>

      <!-- Subtitle -->
      <text x="0" y="145" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="500">
        ${safeSubtitle}
      </text>

      <!-- Mini Terminal Window -->
      <g transform="translate(0, 195)">
        <rect x="0" y="0" width="680" height="110" rx="14" fill="#030712" fill-opacity="0.75" stroke="#334155" stroke-width="1" />
        <circle cx="22" cy="18" r="4.5" fill="#ef4444" />
        <circle cx="36" cy="18" r="4.5" fill="#f59e0b" />
        <circle cx="50" cy="18" r="4.5" fill="#10b981" />
        <line x1="0" y1="34" x2="680" y2="34" stroke="#1e293b" stroke-width="1" />
        
        <text x="22" y="66" fill="${item.accent}" font-family="ui-monospace, monospace" font-size="14" font-weight="700">
          ➜  Parag.dev / ${path.parse(item.filename).name}
        </text>
        <text x="22" y="90" fill="#64748b" font-family="ui-monospace, monospace" font-size="12">
          ✓ Verified Build  •  ✓ Tested Artifact  •  ✓ Clean Architecture
        </text>
      </g>
    </g>
  </svg>
  `;
}

async function run() {
  for (const asset of assets) {
    const svgStr = buildSvg(asset);
    const dest = path.join(uploadsDir, asset.filename);
    await sharp(Buffer.from(svgStr))
      .webp({ quality: 85 })
      .toFile(dest);
    console.log(`Generated WebP: ${dest}`);
  }
}

run();
