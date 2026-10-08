import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = resolve(process.argv[2] ?? ".");
const port = Number(process.argv[3] ?? 4173);
const configuredBasePath = process.env.SITE_BASE_PATH?.trim() || "/";
const basePath = configuredBasePath.endsWith("/") ? configuredBasePath : `${configuredBasePath}/`;
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
]);

const server = createServer(async (request, response) => {
  let pathname;
  const requestUrl = new URL(request.url, "http://localhost");
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  if (basePath !== "/") {
    if (pathname === basePath.slice(0, -1)) {
      response.writeHead(308, { location: `${basePath}${requestUrl.search}` }).end();
      return;
    }
    if (!pathname.startsWith(basePath)) {
      response.writeHead(404).end("Not found");
      return;
    }
    pathname = `/${pathname.slice(basePath.length)}`;
  }

  let filePath = resolve(root, `.${pathname}`);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const fileInfo = await stat(filePath);
    if (fileInfo.isDirectory()) filePath = join(filePath, "index.html");
    else if (!extname(filePath)) {
      try {
        const routeIndex = join(filePath, "index.html");
        await stat(routeIndex);
        filePath = routeIndex;
      } catch {
        response.writeHead(404).end("Not found");
        return;
      }
    }

    const content = await readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes.get(extname(filePath)) ?? "application/octet-stream",
      "x-content-type-options": "nosniff",
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Mind to Safety is available at http://localhost:${port}`);
});