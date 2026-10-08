import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "dist");
const configuredBasePath = process.env.SITE_BASE_PATH?.trim() || "/";
const siteBasePath = configuredBasePath.endsWith("/") ? configuredBasePath : `${configuredBasePath}/`;

if (!/^\/(?:[A-Za-z0-9._~-]+\/)*$/.test(siteBasePath)) {
  throw new Error(`SITE_BASE_PATH must be a slash-delimited path, received: ${siteBasePath}`);
}

const files = [
  "index.html",
  "om-oss/index.html",
  "tjanster/index.html",
  "kontakt/index.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "styles.css",
  "scripts/site.js",
];

await rm(output, { recursive: true, force: true });
for (const file of files) {
  const destination = join(output, file);
  await mkdir(dirname(destination), { recursive: true });
  const source = join(root, file);
  if (file.endsWith(".html")) {
    const html = await readFile(source, "utf8");
    const rootedLinks = html.replace(
      /\b(href|src)="\/(?!\/)([^"]*)"/g,
      (_, attribute, path) => `${attribute}="${siteBasePath}${path}"`,
    );
    await writeFile(destination, rootedLinks);
  } else {
    await cp(source, destination);
  }
}
await cp(join(root, "assets"), join(output, "assets"), { recursive: true });
await cp(join(root, ".nojekyll"), join(output, ".nojekyll"));

const manifestPath = join(output, "site.webmanifest");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
manifest.start_url = siteBasePath;
manifest.icons = manifest.icons.map((icon) => ({
  ...icon,
  src: icon.src.startsWith("/") ? `${siteBasePath}${icon.src.slice(1)}` : icon.src,
}));
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Built static site in ${output} (base path: ${siteBasePath})`);