import fs from "node:fs";

const siteJsonPath = new URL("./site.json", import.meta.url);
const siteData = JSON.parse(fs.readFileSync(siteJsonPath, "utf8"));

const rawLinks = siteData.socialLinks || [];
const socialObj = siteData.social || {};

const resolvedSocialLinks =
  Array.isArray(rawLinks) && rawLinks.length > 0
    ? rawLinks
    : [
        {
          platform: "GitHub",
          url: socialObj.github || "https://github.com/MillenniumParag",
          icon: "github"
        },
        {
          platform: "LinkedIn",
          url:
            socialObj.linkedin ||
            "https://www.linkedin.com/in/chatterjeeparag/",
          icon: "linkedin"
        },
        ...(socialObj.twitter
          ? [
              {
                platform: "Twitter",
                url: socialObj.twitter,
                icon: "twitter"
              }
            ]
          : []),
        ...(socialObj.email
          ? [{ platform: "Email", url: `mailto:${socialObj.email}`, icon: "email" }]
          : [])
      ];

const findUrl = (key) => {
  const match = resolvedSocialLinks.find(
    (item) =>
      (item.icon && item.icon.toLowerCase() === key) ||
      (item.platform && item.platform.toLowerCase().includes(key)) ||
      (item.url && item.url.toLowerCase().includes(key))
  );
  return match ? match.url : "";
};

export default {
  social: {
    ...socialObj,
    github:
      findUrl("github") ||
      socialObj.github ||
      "https://github.com/MillenniumParag",
    linkedin:
      findUrl("linkedin") ||
      socialObj.linkedin ||
      "https://www.linkedin.com/in/chatterjeeparag/",
    twitter: findUrl("twitter") || findUrl("x.com") || socialObj.twitter || "",
    email: findUrl("email") || findUrl("mailto:") || socialObj.email || ""
  },
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
