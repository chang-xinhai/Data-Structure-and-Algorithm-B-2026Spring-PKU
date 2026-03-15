import http from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { spawnSync } from "node:child_process";
import { getRootDir } from "./helpers.mjs";

const rootDir = getRootDir();
const docsDir = join(rootDir, "docs");
const port = Number(process.env.PORT || 4173);

const build = spawnSync(process.execPath, ["scripts/lint.mjs"], {
  cwd: rootDir,
  stdio: "inherit",
  env: {
    ...process.env,
    SITE_BASE: "/"
  }
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const buildSite = spawnSync(process.execPath, ["scripts/build-site.mjs"], {
  cwd: rootDir,
  stdio: "inherit",
  env: {
    ...process.env,
    SITE_BASE: "/"
  }
});

if (buildSite.status !== 0) {
  process.exit(buildSite.status ?? 1);
}

const buildSlides = spawnSync(process.execPath, ["scripts/build-slides.mjs"], {
  cwd: rootDir,
  stdio: "inherit",
  env: {
    ...process.env,
    SITE_BASE: "/"
  }
});

if (buildSlides.status !== 0) {
  process.exit(buildSlides.status ?? 1);
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".pdf": "application/pdf"
};

const server = http.createServer((request, response) => {
  const url = request.url || "/";
  const safePath = normalize(decodeURIComponent(url.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(docsDir, safePath);
  if (safePath.endsWith("/")) {
    filePath = join(docsDir, safePath, "index.html");
  } else if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }
  if (!existsSync(filePath)) {
    filePath = join(docsDir, "404.html");
    response.statusCode = 404;
  }
  const file = readFileSync(filePath);
  response.setHeader("Content-Type", mimeTypes[extname(filePath)] || "application/octet-stream");
  response.end(file);
});

server.listen(port, () => {
  console.log(`Course site available at http://localhost:${port}`);
  console.log("Site and slides were rebuilt before serving.");
});
