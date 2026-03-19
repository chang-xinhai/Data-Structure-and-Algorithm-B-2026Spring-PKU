import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { getRootDir } from "./helpers.mjs";

const rootDir = getRootDir();
const file = join(rootDir, "content", "course.json");
const [orderInput, slugInput, titleInput, typeInput = "lecture"] = process.argv.slice(2);

if (!orderInput || !slugInput || !titleInput) {
  console.error("Usage: npm run new:lesson -- <order> <slug> <title> [type]");
  process.exit(1);
}

const order = Number(orderInput);
if (!Number.isInteger(order) || order <= 0) {
  console.error("Order must be a positive integer.");
  process.exit(1);
}

const data = JSON.parse(readFileSync(file, "utf8"));
if (data.lessons.some((lesson) => lesson.slug === slugInput || lesson.order === order)) {
  console.error("Lesson order or slug already exists.");
  process.exit(1);
}

const lesson = {
  id: `lecture-${String(order).padStart(2, "0")}`,
  order,
  slug: slugInput,
  title: titleInput,
  type: typeInput,
  status: "drafting",
  summary: "待补充课程摘要。",
  topics: ["待补充知识梳理", "待补充例题", "待补充课堂练习", "待补充课后题"],
  resourceNotes: [],
  resources: [],
  source: `slides/${slugInput}/slides.md`,
  pdf: `docs/pdfs/${slugInput}.pdf`
};

data.lessons.push(lesson);
data.lessons.sort((left, right) => left.order - right.order);
writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);

const slideDir = join(rootDir, "slides", slugInput);
mkdirSync(slideDir, { recursive: true });
const slideFile = join(slideDir, "slides.md");
if (!existsSync(slideFile)) {
  writeFileSync(
    slideFile,
    `---
theme: seriph
title: ${titleInput}
info: 数据结构与算法 B 小班课
class: text-center
mdc: true
---

# ${titleInput}

---
layout: section
---

# 知识梳理

---

# 典型例题

---

# 课堂练习

---

# 课后题
`
  );
}

console.log(`Created lesson ${titleInput}`);
