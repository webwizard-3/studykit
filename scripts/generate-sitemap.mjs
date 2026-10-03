// Regenerates public/sitemap.xml from the tool registry so it can never
// drift out of sync with the actual routes. Run with: npm run sitemap
// (also runs automatically before `npm run build`, see package.json).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { TOOLS, CATEGORIES } from "../src/data/tools.js";

const SITE_URL = "https://www.studykit.example"; // TODO: replace with your real production domain

const staticRoutes = ["/", "/tools", "/guides", "/about", "/privacy", "/contact"];
const categoryRoutes = Object.values(CATEGORIES).map((c) => `/${c.slug}`);
const toolRoutes = TOOLS.map((t) => `/tools/${t.slug}`);

const allRoutes = [...staticRoutes, ...categoryRoutes, ...toolRoutes];

const urls = allRoutes
  .map((route) => {
    const priority = route === "/" ? "1.0" : route.startsWith("/tools/") ? "0.8" : "0.6";
    return `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(outPath, xml, "utf8");
console.log(`sitemap.xml written with ${allRoutes.length} URLs.`);
