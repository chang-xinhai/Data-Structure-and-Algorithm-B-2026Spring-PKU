import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getRootDir, loadCourseData } from "./helpers.mjs";

const rootDir = getRootDir();
const data = loadCourseData();
const seenSlugs = new Set();
const errors = [];

if (!data.course?.basePath?.startsWith("/")) {
  errors.push("content/course.json: course.basePath must start with '/'.");
}

for (const lesson of data.lessons ?? []) {
  if (seenSlugs.has(lesson.slug)) {
    errors.push(`Duplicate lesson slug: ${lesson.slug}`);
  }
  seenSlugs.add(lesson.slug);

  const sourcePath = join(rootDir, lesson.source);
  if (!existsSync(sourcePath)) {
    errors.push(`Missing slide source: ${lesson.source}`);
    continue;
  }
  if (lesson.handout && !existsSync(join(rootDir, lesson.handout))) {
    errors.push(`Missing handout notebook: ${lesson.handout}`);
  }
  const content = readFileSync(sourcePath, "utf8");
  if (!content.includes("theme: seriph")) {
    errors.push(`${lesson.source}: missing 'theme: seriph' frontmatter.`);
  }
  if (!lesson.title.startsWith("Lecture ")) {
    errors.push(`${lesson.id}: title must start with 'Lecture '.`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${data.lessons.length} lessons.`);
