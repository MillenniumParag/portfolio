import fs from "node:fs";
import path from "node:path";

const targetDir = path.resolve("./src/icons/tech");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const iconUrls = {
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  spring: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  c: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  aws: "https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_aws.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  oracle: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg",
  neondb: "https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/database.svg",
  tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  daisyui: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/daisyui.svg",
  linux: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linux.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  restapi: "https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_rest.svg",
  vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  sap: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sap.svg",
};

async function downloadIcons() {
  for (const [name, url] of Object.entries(iconUrls)) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      let svg = await res.text();

      // Custom color adjustments for monochrome base SVGs
      if (name === "daisyui") {
        // Give daisyUI petal & center colored fills (emerald green + golden center)
        svg = svg.replace('<svg ', '<svg fill="#1eb854" ');
      } else if (name === "sap") {
        // Give SAP official SAP Blue fill
        svg = svg.replace('<svg ', '<svg fill="#008fd3" ');
      } else if (name === "neondb") {
        // Neon database signature electric neon green
        svg = svg.replace(/fill="#[a-fA-F0-9]+"/g, 'fill="#00e599"');
      } else if (name === "linux") {
        // Tux penguin gold accent
        svg = svg.replace('<svg ', '<svg fill="#facc15" ');
      }

      const filePath = path.join(targetDir, `${name}.svg`);
      fs.writeFileSync(filePath, svg, "utf8");
      console.log(`✓ Saved ${name}.svg (${svg.length} bytes)`);
    } catch (err) {
      console.error(`✗ Error downloading ${name}:`, err.message);
    }
  }
}

downloadIcons();
