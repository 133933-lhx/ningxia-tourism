import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT) || 3000;
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

async function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidate = path.resolve(root, `.${decoded}`);
  if (candidate !== root && !candidate.startsWith(`${root}${path.sep}`)) {
    return null;
  }

  try {
    const info = await stat(candidate);
    if (info.isFile()) return candidate;
    if (info.isDirectory()) {
      const index = path.join(candidate, "index.html");
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    // Try the extensions below.
  }

  if (!path.extname(candidate)) {
    for (const suffix of [".html", path.join("index.html")]) {
      const fallback = path.resolve(`${candidate}${suffix}`);
      if (
        (fallback === root || fallback.startsWith(`${root}${path.sep}`)) &&
        (await stat(fallback).catch(() => null))?.isFile()
      ) {
        return fallback;
      }
    }
  }

  return null;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
  let pathname = url.pathname;
  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length) || "/";
  }
  const file = await resolveFile(pathname);

  if (!file) {
    const notFound = path.join(root, "404.html");
    const body = await readFile(notFound).catch(() => "Not found");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(body);
    return;
  }

  const body = await readFile(file);
  const type = contentTypes[path.extname(file)] ?? "application/octet-stream";
  response.writeHead(200, { "Content-Type": type });
  response.end(body);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview: http://127.0.0.1:${port}`);
});
