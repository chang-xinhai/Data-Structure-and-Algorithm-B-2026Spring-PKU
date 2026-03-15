import { mkdirSync, readFileSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";

const rootDir = dirname(new URL("../package.json", import.meta.url).pathname);

export function getRootDir() {
  return rootDir;
}

export function loadCourseData() {
  const file = join(rootDir, "content", "course.json");
  return JSON.parse(readFileSync(file, "utf8"));
}

export function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

export function copyDir(sourceDir, targetDir) {
  ensureDir(targetDir);
  for (const entry of readdirSync(sourceDir)) {
    const sourcePath = join(sourceDir, entry);
    const targetPath = join(targetDir, entry);
    const stats = statSync(sourcePath);
    if (stats.isDirectory()) {
      copyDir(sourcePath, targetPath);
      continue;
    }
    copyFileSync(sourcePath, targetPath);
  }
}

export function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function lessonStatusLabel(status) {
  const labels = {
    planned: "Planned",
    drafting: "Drafting",
    published: "Published"
  };
  return labels[status] ?? status;
}

export function lessonTypeLabel(type) {
  const labels = {
    lecture: "Core Lesson",
    "lab-review": "Lab Review",
    "exam-review": "Written Review"
  };
  return labels[type] ?? type;
}

export function makeBasePath() {
  return process.env.SITE_BASE || loadCourseData().course.basePath || "/";
}

export function withBase(basePath, path) {
  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}

export function lessonSourcePath(lesson) {
  return join(getRootDir(), lesson.source);
}

