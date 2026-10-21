# Parag Chatterjee — 11ty + TailwindCSS v4 + daisyUI v5 + Decap CMS

A production-ready, ultra-fast Jamstack blog and website built with:
- **[Eleventy (11ty) 3](https://www.11ty.dev/)**: Zero-JS static site generator.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: CSS-first modern utility styles compiled via PostCSS.
- **[daisyUI v5](https://daisyui.com/)**: Semantic, themeable UI components (includes theme switcher with Emerald, Synthwave, Corporate, Business, Cupcake, Light, and Dark).
- **[Decap CMS](https://decapcms.org/)**: Git-based CMS with Netlify Identity / Git Gateway integration and local proxy backend support.
- **[Netlify](https://www.netlify.com/)**: Automated builds and deployments configured via `netlify.toml`.

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Run Eleventy dev server
```bash
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to view your site.

### 3. Run with Decap CMS Local Backend (Offline Editing)
You can test the Decap CMS admin interface locally without committing to Git or setting up OAuth:
```bash
npm run dev:cms
```
This runs both Eleventy and `decap-server` together:
- Website: [http://localhost:8080](http://localhost:8080)
- Decap CMS Admin: [http://localhost:8080/admin/](http://localhost:8080/admin/)

---

## 📁 Project Structure

```text
parag/
├── .gitignore
├── eleventy.config.mjs    # Eleventy 3 config with PostCSS Tailwind v4 & daisyUI compilation
├── netlify.toml           # Netlify build command, publish dir, & admin redirect
├── package.json           # Dependencies and scripts
├── src/
│   ├── _includes/
│   │   └── layouts/
│   │       ├── base.njk   # Master shell layout with theme switcher & Netlify Identity
│   │       ├── project.njk# Project case study layout
│   │       ├── post.njk   # Blog article layout
│   │       ├── home.njk       # Landing page layout
│   │       ├── about.njk      # About page layout
│   │       ├── experience.njk # Career & academic experience layout
│   │       ├── resume.njk     # Print-ready Resume / CV layout
│   │       ├── uses.njk       # Developer setup layout
│   │       ├── contact.njk    # Contact & inquiry layout
│   │       ├── projects-catalog.njk # Projects catalog layout
│   │       ├── blog-catalog.njk     # Blog catalog layout
│   │       ├── project.njk    # Project case study layout
│   │       └── post.njk       # Blog article layout
│   ├── admin/
│   │   ├── index.html         # Decap CMS with client-side auto-compressor & size guide
│   │   └── config.yml         # Complete collections for Pages, Projects, Posts, and Settings
│   ├── projects/              # Dedicated portfolio projects & case studies
│   │   ├── index.md           # Projects catalog header (CMS-updatable)
│   │   ├── cloud-analytics-platform.md
│   │   ├── ai-developer-suite.md
│   │   ├── design-system-daisyui.md
│   │   └── hyperlink-distributed-cache.md
│   ├── posts/                 # Blog articles managed via Decap CMS
│   │   ├── 2026-03-01-architecting-modern-telemetry-pipelines.md
│   │   ├── 2026-03-10-why-tailwind-v4-and-daisyui-v5-are-a-game-changer.md
│   │   └── 2026-03-15-git-driven-content-with-decap-cms-and-netlify.md
│   ├── styles/
│   │   └── index.css          # Tailwind v4 entrypoint with daisyUI plugin configuration
│   ├── uploads/               # Auto-compressed media uploads from Decap CMS
│   ├── index.md               # Home Page content (CMS-updatable)
│   ├── about.md               # About Me content (CMS-updatable)
│   ├── experience.md          # Experience & Timeline (CMS-updatable)
│   ├── resume.md              # Resume / CV content (CMS-updatable)
│   ├── uses.md                # Uses & Gear setup (CMS-updatable)
│   ├── contact.md             # Contact info & FAQs (CMS-updatable)
│   ├── blog/
│   │   └── index.md           # Blog archive header (CMS-updatable)
│   ├── contact/
│   │   └── success.njk        # Form submission success page
│   ├── 404.njk                # Custom 404 error page
│   ├── feed.xml.njk           # Atom / RSS 2.0 Feed for blog articles
│   ├── sitemap.xml.njk        # Dynamic XML Sitemap for SEO indexing
│   └── robots.njk             # Search crawler directives
```

---

## 🌐 Netlify Deployment Steps (Newer Netlify UI)

Follow these steps to deploy and connect Decap CMS using Netlify's modern dashboard:

### Step 1: Push Project to GitHub / GitLab
1. Initialize Git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Eleventy + Tailwind v4 + daisyUI + Decap CMS"
   ```
2. Create a new repository on [GitHub](https://github.com/new) and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import Site into Netlify
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **"Add new site"** (top right) ➔ **"Import an existing project"**.
3. Choose **GitHub** (or your Git provider) and authorize access to your repository.
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `_site`
5. Click **"Deploy <site-name>"**.

### Step 3: Enable Netlify Identity (New Netlify UI)
1. In your Netlify site dashboard, navigate to **Site configuration** in the left sidebar.
2. Select **Identity** (or go to **Integrations** ➔ search for **Netlify Identity**).
3. Click **"Enable Identity"**.
4. Under **Registration preferences**:
   - Set to **"Invite only"** (Recommended so only you and approved editors can register).
5. Under **External providers** (optional):
   - You can enable GitHub, Google, or GitLab login.

### Step 4: Enable Git Gateway
1. Still under **Site configuration** ➔ **Identity**, scroll down to the **Services** section.
2. Find **Git Gateway** and click **"Enable Git Gateway"**.
3. Authenticate with your GitHub account to grant Netlify permission to commit changes on behalf of authenticated editors.

### Step 5: Invite Your Admin User
1. In your site dashboard, click the top **Identity** tab.
2. Click **"Invite users"**.
3. Enter your email address and send the invite.
4. Check your email inbox and click the invitation link.
5. Set your password in the Netlify Identity modal that opens.

### Step 6: Log In to Decap CMS
1. Navigate to your live site at `https://<your-site>.netlify.app/admin/`.
2. Click **"Login with Netlify Identity"**.
3. You can now create, edit, publish posts, and upload images with continuous deployment!

---

## 🛠️ NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs Eleventy live-reloading dev server on `http://localhost:8080` |
| `npm run build` | Compiles Tailwind CSS v4, daisyUI v5, and static site into `_site/` |
| `npm run cms:proxy` | Starts Decap CMS local backend server on port 8081 |
| `npm run dev:cms` | Concurrently runs both the dev server and local CMS proxy |

---

## 🔍 Google & Bing SEO Optimization Guide

This portfolio includes complete, enterprise-grade search engine optimization tailored specifically for **Google Search / Discover** and **Microsoft Bing**:

### 1. Verification Tokens
To verify ownership in Google Search Console and Bing Webmaster Tools:
1. Open [`src/_data/site.js`](file:///c:/Users/amite/Development/Experiments/parag/src/_data/site.js).
2. Paste your verification keys into the `verification` block:
   ```javascript
   verification: {
     google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
     bing: "YOUR_BING_WEBMASTER_CODE"
   }
   ```
3. When deployed, the site automatically emits `<meta name="google-site-verification">` and `<meta name="msvalidate.01">` in `<head>`.

### 2. Search Engine Directives & Sitemaps
- **Multi-Engine Robots Directives**: Emits `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1` for Googlebot and Bingbot to maximize rich snippet eligibility.
- **Canonical URLs**: Every page includes a canonical `<link rel="canonical" href="..." />` to prevent duplicate indexing.
- **Strict XML Sitemap**: Generated at `/sitemap.xml` with priority ratings and change frequencies:
  - Homepage: `priority 1.0`, `daily`
  - Projects & Resume: `priority 0.9`, `weekly`
  - Blog & About: `priority 0.8`, `weekly`
- **robots.txt**: Configured at `/robots.txt` with dedicated crawler directives for `Googlebot` and `Bingbot` (including `Crawl-delay: 1` for Bingbot and `/admin/` protection).

### 3. Rich Snippets & JSON-LD (Schema.org)
Search engines receive machine-readable structured data automatically:
- **`WebSite` & `Person` Schema**: Defines Parag as an entry-level software engineer, linking social profiles (GitHub, LinkedIn, Twitter) and technical competencies.
- **`BlogPosting` Schema**: Enriches all `/posts/` articles with publish date, author, headline, and preview image for Google News/Discover cards.
- **`SoftwareSourceCode` Schema**: Highlights `/projects/` repositories with code languages and GitHub links.
- **`BreadcrumbList` Schema**: Displays clear hierarchical breadcrumbs in Google and Bing SERP listings.

---

## 🖼️ Recommended Image Sizes for SEO & Social Media

To maintain 100/100 Core Web Vitals, optimal search engine crawl efficiency, and crystal-clear social sharing cards across Google, Bing, LinkedIn, and Twitter, adhere to these standard dimensions:

| Placement | Recommended Dimensions | Aspect Ratio | Target File Size | Optimal Format | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Social / OpenGraph / Blog Cover** | `1200 x 630 px` | `1.91:1` | `< 200 KB` | WebP or JPEG | Required for Google Discover cards, Bing snippet previews, Twitter Summary Large Image, LinkedIn, and Facebook. |
| **Project Showcase Card** | `1200 x 800 px` | `3:2` | `< 150 KB` | WebP or JPEG | Crisp retina display for desktop and mobile portfolio grids without layout shifts. |
| **Author Avatar / Headshot** | `400 x 400 px` | `1:1 (Square)` | `< 50 KB` | WebP or PNG | Profile photos, Schema.org `Person.image`, and bio cards. |
| **Inline Article Screenshots** | `Max 1600 px width` | Responsive | `< 200 KB` | WebP or SVG | Technical architecture diagrams, code screenshots, and UI mockups. |

---

## ⚡ 3-Tier Image Upload Compression Architecture

To prevent large camera or screenshot uploads from bloating the repository and slowing down page speeds:

1. **Tier 1 — Admin Upload Limit (`src/admin/config.yml`)**:
   - `max_file_size: 2000000` (2 MB hard limit) rejects accidental raw camera photos.
   - Field `hint`s clearly show recommended dimensions right in the CMS editor.

2. **Tier 2 — Client-Side In-Browser Auto-Compressor (`src/admin/index.html`)**:
   - Any image dropped or uploaded into Decap CMS is intercepted before commit.
   - If larger than 1600px wide, an HTML5 Canvas resizes and re-encodes the image into modern WebP at `quality: 0.82`.
   - A 5MB camera upload is shrunk to ~100KB-180KB in-browser before sending to Git.
   - A floating **"📐 SEO Image Size Guide"** button in Decap CMS offers a quick-reference modal for editors.

3. **Tier 3 — Build-Time Sharp Pipeline (`eleventy.config.mjs`)**:
   - During `npm run build`, Node's `sharp` library processes all images in `src/uploads/`.
   - Resizes any oversized images to a max width of 1600px.
   - Generates optimized progressive WebP and compressed JPEG assets with high perceptual fidelity.

