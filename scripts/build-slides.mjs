import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { getRootDir, loadCourseData, makeBasePath, lessonSourcePath } from "./helpers.mjs";

const rootDir = getRootDir();
const docsDir = join(rootDir, "docs");
const slidesDir = join(docsDir, "slides");
const data = loadCourseData();
const basePath = makeBasePath();

mkdirSync(slidesDir, { recursive: true });

for (const lesson of data.lessons) {
  const outputDir = join(slidesDir, lesson.slug);
  const slideBase = `${basePath.endsWith("/") ? basePath : `${basePath}/`}slides/${lesson.slug}/`;
  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["slidev", "build", lessonSourcePath(lesson), "--base", slideBase, "--out", outputDir],
    {
      cwd: rootDir,
      stdio: "inherit"
    }
  );
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

