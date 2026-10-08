import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const routes = ["/", "/om-oss", "/tjanster", "/kontakt"];
const htmlPath = (route) => join(root, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);

test("each public route has Swedish document metadata and one primary heading", async () => {
  for (const route of routes) {
    const html = await readFile(htmlPath(route), "utf8");
    assert.match(html, /<html lang="sv">/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://mindtosafety\\.se${route === "/" ? "/" : route}">`));
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route} should have one h1`);
  }
});

test("internal page, section, and local asset links resolve", async () => {
  for (const route of routes) {
    const html = await readFile(htmlPath(route), "utf8");
    const links = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    for (const link of links) {
      if (link.startsWith("mailto:") || link.startsWith("https://") || link.startsWith("#")) continue;
      const url = new URL(link, `https://mindtosafety.se${route}`);
      const pathname = decodeURIComponent(url.pathname);
      if (pathname.startsWith("/assets/") || pathname.startsWith("/scripts/")) {
        await access(join(root, pathname.slice(1)));
      } else if (["/styles.css", "/site.webmanifest", "/sitemap.xml", "/robots.txt"].includes(pathname)) {
        await access(join(root, pathname.slice(1)));
      } else if (pathname === "/" || routes.includes(pathname)) {
        await access(htmlPath(pathname));
      } else {
        assert.fail(`Unexpected local target ${link} in ${route}`);
      }
      if (url.hash) {
        const targetHtml = await readFile(htmlPath(pathname), "utf8");
        assert.match(targetHtml, new RegExp(`id="${url.hash.slice(1)}"`), `${link} has no target`);
      }
    }
  }
});

test("indexable pages provide social metadata and local assets", async () => {
  for (const route of routes) {
    const html = await readFile(htmlPath(route), "utf8");
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:description"/);
    assert.match(html, /property="og:image" content="https:\/\/mindtosafety\.se\/assets\/campus\.jpg"/);
  }
  const stylesheet = await readFile(join(root, "styles.css"), "utf8");
  assert.match(stylesheet, /:focus-visible/);
  assert.match(stylesheet, /prefers-reduced-motion/);
});

test("service anchor links stay on the services route", async () => {
  const html = await readFile(htmlPath("/tjanster"), "utf8");
  for (const id of ["pdv", "sakerhetsanalys", "bemotande"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test("GitHub Pages builds prefix route, asset, and manifest paths", async () => {
  const basePath = "/calm-consultancy-hub/";
  try {
    execFileSync(process.execPath, [join(root, "scripts/build.mjs")], {
      cwd: root,
      env: { ...process.env, SITE_BASE_PATH: basePath },
      stdio: "ignore",
    });

    for (const route of routes) {
      const html = await readFile(join(root, "dist", route === "/" ? "index.html" : `${route.slice(1)}/index.html`), "utf8");
      const localUrls = [...html.matchAll(/\b(?:href|src)="(\/[^\"]*)"/g)].map((match) => match[1]);
      assert.ok(localUrls.length > 0, `${route} should contain local URLs`);
      assert.ok(localUrls.every((url) => url.startsWith(basePath)), `${route} has a URL outside ${basePath}`);
    }

    const manifest = JSON.parse(await readFile(join(root, "dist/site.webmanifest"), "utf8"));
    assert.equal(manifest.start_url, basePath);
    assert.ok(manifest.icons.every((icon) => icon.src.startsWith(basePath)));
  } finally {
    execFileSync(process.execPath, [join(root, "scripts/build.mjs")], {
      cwd: root,
      env: { ...process.env, SITE_BASE_PATH: "/" },
      stdio: "ignore",
    });
  }
});