import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getRootDir, loadCourseData } from "./helpers.mjs";

const rootDir = getRootDir();
const data = loadCourseData();
const seenSlugs = new Set();
const errors = [];

function validateResource(resource, context) {
  if (!resource?.label) {
    errors.push(`${context}: resource.label is required.`);
  }
  if (!resource?.url?.startsWith("https://")) {
    errors.push(`${context}: resource.url must start with 'https://'.`);
  }
  if (!resource?.kind) {
    errors.push(`${context}: resource.kind is required.`);
  }
}

if (!data.course?.basePath?.startsWith("/")) {
  errors.push("content/course.json: course.basePath must start with '/'.");
}

for (const collection of data.resourceCollections ?? []) {
  if (!collection.id || !collection.title || !collection.summary) {
    errors.push("content/course.json: every resource collection must include id, title and summary.");
    continue;
  }
  if (!Array.isArray(collection.links) || collection.links.length === 0) {
    errors.push(`resource collection '${collection.id}': links must be a non-empty array.`);
  }
  if (!Array.isArray(collection.usage) || collection.usage.length === 0) {
    errors.push(`resource collection '${collection.id}': usage must be a non-empty array.`);
  }
  if (!Array.isArray(collection.caveats) || collection.caveats.length === 0) {
    errors.push(`resource collection '${collection.id}': caveats must be a non-empty array.`);
  }
  for (const [index, resource] of (collection.links ?? []).entries()) {
    validateResource(resource, `resource collection '${collection.id}' link #${index + 1}`);
  }
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
  if (lesson.resourceNotes && !Array.isArray(lesson.resourceNotes)) {
    errors.push(`${lesson.id}: resourceNotes must be an array when provided.`);
  }
  for (const [index, resource] of (lesson.resources ?? []).entries()) {
    validateResource(resource, `${lesson.id} resource #${index + 1}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${data.lessons.length} lessons.`);
