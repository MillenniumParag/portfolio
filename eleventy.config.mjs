import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import sharp from "sharp";

/**
 * Build-time Sharp Image Optimization Pipeline
 * - Resizes oversized images (> 1600px) down to safe web dimensions
 * - Compresses JPEG/PNG/WebP with high perceptual quality (quality: 82)
 * - Automatically generates modern WebP companions for PNG/JPEG
 * - Writes optimized assets to _site/uploads/ for green Core Web Vitals
 */
async function optimizeUploadedImages() {
  const uploadsDir = path.resolve("./src/uploads");
  const siteUploadsDir = path.resolve("./_site/uploads");

  if (!fs.existsSync(uploadsDir)) return;
  if (!fs.existsSync(siteUploadsDir)) {
    fs.mkdirSync(siteUploadsDir, { recursive: true });
  }

  const files = fs.readdirSync(uploadsDir);
  const imageExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif"];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!imageExtensions.includes(ext)) continue;

    const srcPath = path.join(uploadsDir, file);
    const destPath = path.join(siteUploadsDir, file);

    try {
      const metadata = await sharp(srcPath).metadata();
      const pipeline = sharp(srcPath);

      // Downsize if larger than max width of 1600px (preserving aspect ratio)
      if (metadata.width && metadata.width > 1600) {
        pipeline.resize({ width: 1600, withoutEnlargement: true });
      }

      if (ext === ".jpg" || ext === ".jpeg") {
        await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(destPath);
        // Also output a companion WebP
        const webpDest = path.join(siteUploadsDir, `${path.parse(file).name}.webp`);
        await sharp(srcPath)
          .resize({ width: Math.min(metadata.width || 1600, 1600), withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(webpDest);
      } else if (ext === ".png") {
        await pipeline.png({ compressionLevel: 8 }).toFile(destPath);
        // Also output a companion WebP
        const webpDest = path.join(siteUploadsDir, `${path.parse(file).name}.webp`);
        await sharp(srcPath)
          .resize({ width: Math.min(metadata.width || 1600, 1600), withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(webpDest);
      } else if (ext === ".webp") {
        await pipeline.webp({ quality: 82 }).toFile(destPath);
      } else if (ext === ".avif") {
        await pipeline.avif({ quality: 82 }).toFile(destPath);
        // Also output a companion WebP
        const webpDest = path.join(siteUploadsDir, `${path.parse(file).name}.webp`);
        await sharp(srcPath)
          .resize({ width: Math.min(metadata.width || 1600, 1600), withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(webpDest);
      }
    } catch (err) {
      console.warn(`[Image Optimization] Fallback copy for ${file}:`, err.message);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export default function (eleventyConfig) {
  // Passthrough static assets
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-32x32.png": "favicon-32x32.png" });
  eleventyConfig.addPassthroughCopy({ "src/favicon-16x16.png": "favicon-16x16.png" });
  eleventyConfig.addPassthroughCopy({ "src/apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy({ "src/icons": "icons" });

  // Watch CSS and image file changes
  eleventyConfig.addWatchTarget("./src/styles/");
  eleventyConfig.addWatchTarget("./src/uploads/");

  // Run PostCSS and Image Optimization on build
  eleventyConfig.on("eleventy.after", async () => {
    // 1. Process Tailwind CSS v4 & daisyUI v5
    const inputPath = path.resolve("./src/styles/index.css");
    const outputPath = path.resolve("./_site/styles/index.css");

    if (fs.existsSync(inputPath)) {
      const cssContent = fs.readFileSync(inputPath, "utf8");
      const outputDir = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const result = await postcss([tailwindcss()]).process(cssContent, {
        from: inputPath,
        to: outputPath,
      });

      fs.writeFileSync(outputPath, result.css);
    }

    // 2. Compress and optimize uploaded images with Sharp
    await optimizeUploadedImages();
  });

  // String helper filters
  eleventyConfig.addFilter("startsWith", (str, prefix) => {
    if (!str) return false;
    return String(str).startsWith(prefix);
  });

  // Split string into array filter
  eleventyConfig.addFilter("split", (str, delimiter = ",") => {
    if (!str) return [];
    if (Array.isArray(str)) return str;
    return String(str)
      .split(delimiter)
      .map((item) => item.trim())
      .filter(Boolean);
  });

  // Date formatting filter for posts
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Limit array slice filter
  eleventyConfig.addFilter("limit", (arr, limit) => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, limit);
  });

  // Year shortcode
  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
