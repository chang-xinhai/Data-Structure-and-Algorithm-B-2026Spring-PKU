import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { getRootDir, loadCourseData, lessonSourcePath } from "./helpers.mjs";

const rootDir = getRootDir();
const pdfDir = join(rootDir, "docs", "pdfs");
const data = loadCourseData();

mkdirSync(pdfDir, { recursive: true });

for (const lesson of data.lessons) {
  const outputFile = join(pdfDir, `${lesson.slug}.pdf`);
  const result = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["slidev", "export", lessonSourcePath(lesson), "--output", outputFile, "--with-clicks"],
    {
      cwd: rootDir,
      stdio: "inherit"
    }
  );
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
