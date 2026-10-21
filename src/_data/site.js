import fs from "node:fs";

const siteJsonPath = new URL("./site.json", import.meta.url);
const siteData = JSON.parse(fs.readFileSync(siteJsonPath, "utf8"));

export default {
  ...siteData,
  imageStandards: {
    socialShareOg: {
      label: "Social Share & OpenGraph (Google Discover / Bing / Twitter / LinkedIn)",
      dimensions: "1200 x 630 px",
      ratio: "1.91:1",
      maxSize: "200 KB",
      formats: "WebP, JPEG"
    },
    projectCover: {
      label: "Project Card & Case Study Cover",
      dimensions: "1200 x 800 px",
      ratio: "3:2",
      maxSize: "150 KB",
      formats: "WebP, JPEG, PNG"
    },
    avatar: {
      label: "Author Headshot & Avatar",
      dimensions: "400 x 400 px",
      ratio: "1:1",
      maxSize: "50 KB",
      formats: "WebP, PNG"
    },
    inlineArticle: {
      label: "Inline Article Screenshots & Diagrams",
      dimensions: "Max width 1600 px",
      ratio: "Responsive",
      maxSize: "200 KB",
      formats: "WebP, PNG, SVG"
    }
  }
};
