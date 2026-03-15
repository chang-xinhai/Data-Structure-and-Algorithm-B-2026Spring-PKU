import { rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  copyDir,
  ensureDir,
  escapeHtml,
  getRootDir,
  lessonStatusLabel,
  lessonTypeLabel,
  loadCourseData,
  makeBasePath,
  withBase
} from "./helpers.mjs";

const rootDir = getRootDir();
const docsDir = join(rootDir, "docs");
const basePath = makeBasePath();
const data = loadCourseData();

rmSync(docsDir, { recursive: true, force: true });
ensureDir(docsDir);
copyDir(join(rootDir, "public"), docsDir);

function renderLayout({ title, body, activeNav }) {
  const courseTitle = escapeHtml(data.course.title);
  const titleText = escapeHtml(title);
  const navItems = [
    { href: withBase(basePath, ""), label: "首页", key: "home" },
    { href: withBase(basePath, "progress/"), label: "进度", key: "progress" },
    { href: withBase(basePath, "announcements/"), label: "公告", key: "announcements" }
  ];
  const navHtml = navItems
    .map((item) => {
      const active = item.key === activeNav ? ' style="color: var(--ink)"' : "";
      return `<a href="${item.href}"${active}>${item.label}</a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${titleText} | ${courseTitle}</title>
    <meta name="description" content="${escapeHtml(data.course.description)}" />
    <link rel="stylesheet" href="${withBase(basePath, "site.css")}" />
  </head>
  <body>
    <div class="shell">
      <header class="topbar">
        <div class="brand">${courseTitle}</div>
        <nav class="nav">${navHtml}</nav>
      </header>
      ${body}
      <footer class="footer">
        <div>${courseTitle} · ${escapeHtml(data.course.term)} · Instructor ${escapeHtml(data.course.instructor)}</div>
      </footer>
    </div>
  </body>
</html>`;
}

function writePage(relativeDir, html) {
  const targetDir = join(docsDir, relativeDir);
  ensureDir(targetDir);
  writeFileSync(join(targetDir, "index.html"), html);
}

function renderLessonCard(lesson) {
  const topicHtml = lesson.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("");
  const slideHref = withBase(basePath, `slides/${lesson.slug}/`);
  const lessonHref = withBase(basePath, `lessons/${lesson.slug}/`);
  const pdfHref = withBase(basePath, `pdfs/${lesson.slug}.pdf`);
  return `<article class="lesson-card">
    <div class="lesson-order">${String(lesson.order).padStart(2, "0")}</div>
    <h3>${escapeHtml(lesson.title)}</h3>
    <p>${escapeHtml(lesson.summary)}</p>
    <div class="badge-row">
      <span class="badge">${escapeHtml(lessonTypeLabel(lesson.type))}</span>
      <span class="badge">${escapeHtml(lessonStatusLabel(lesson.status))}</span>
    </div>
    <ul class="topics">${topicHtml}</ul>
    <div class="action-row">
      <a class="button primary" href="${lessonHref}">查看课次页</a>
      <a class="button secondary" href="${slideHref}">在线课件</a>
      <a class="button secondary" href="${pdfHref}">PDF</a>
    </div>
  </article>`;
}

const lessonCards = data.lessons.map(renderLessonCard).join("");
const announcements = data.announcements
  .map(
    (item) => `<article class="notice">
      <time>${escapeHtml(item.date)}</time>
      <h3>${escapeHtml(item.title)}</h3>
      <p style="margin-top: 10px">${escapeHtml(item.content)}</p>
    </article>`
  )
  .join("");
const highlightList = data.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

writePage(
  "",
  renderLayout({
    title: data.course.title,
    activeNav: "home",
    body: `<section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">${escapeHtml(data.course.term)} · Slidev / GitHub Pages</span>
        <h1>${escapeHtml(data.course.title)}</h1>
        <p>${escapeHtml(data.course.description)}</p>
        <div class="hero-actions">
          <a class="button primary" href="#lessons">进入课次目录</a>
          <a class="button secondary" href="${withBase(basePath, "progress/")}">查看教学进度</a>
        </div>
      </div>
      <div class="panel">
        <div class="kicker">授课策略</div>
        <ul class="list">${highlightList}</ul>
      </div>
    </section>
    <section class="section-title" id="lessons">
      <div>
        <h2>课次目录</h2>
        <p>前 4 次课覆盖全部核心大纲，第 5 次课做上机复习，第 6 次课做笔试复习。后续新增课程时，目录将自动扩展。</p>
      </div>
    </section>
    <section class="lesson-grid">${lessonCards}</section>
    <section class="section-title">
      <div>
        <h2>课程公告</h2>
        <p>用于发布课次调整、资料更新和勘误说明。</p>
      </div>
      <a class="button secondary" href="${withBase(basePath, "announcements/")}">查看全部公告</a>
    </section>
    <section class="grid-2">
      ${announcements || '<div class="empty">暂无公告。</div>'}
    </section>`
  })
);

writePage(
  "progress",
  renderLayout({
    title: "教学进度",
    activeNav: "progress",
    body: `<section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Course Progress</span>
        <h1>教学进度</h1>
        <p>使用统一元数据管理课次状态、内容摘要和公开入口。后续加课时无需改站点代码。</p>
      </div>
      <div class="panel">
        <div class="kicker">当前默认节奏</div>
        <ul class="list">
          <li>Lecture 01-04：讲完所有核心大纲内容</li>
          <li>Lecture 05：上机复习</li>
          <li>Lecture 06：笔试复习</li>
        </ul>
      </div>
    </section>
    <section class="meta-grid">
      ${data.lessons
        .map(
          (lesson) => `<article class="meta-card panel">
            <span class="pill">${escapeHtml(lessonStatusLabel(lesson.status))}</span>
            <h3 style="margin-top: 14px">${escapeHtml(lesson.title)}</h3>
            <p style="margin-top: 12px">${escapeHtml(lesson.summary)}</p>
            <div class="action-row">
              <a class="button secondary" href="${withBase(basePath, `lessons/${lesson.slug}/`)}">课次页</a>
            </div>
          </article>`
        )
        .join("")}
    </section>`
  })
);

writePage(
  "announcements",
  renderLayout({
    title: "课程公告",
    activeNav: "announcements",
    body: `<section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Announcements</span>
        <h1>课程公告</h1>
        <p>记录课程安排更新、课件修订、增补资料和阶段性提醒。</p>
      </div>
      <div class="panel">
        <div class="kicker">公开边界</div>
        <ul class="list">
          <li>站点只展示可公开的教学内容。</li>
          <li>学生信息、教学计划与日志不得进入公开仓库。</li>
        </ul>
      </div>
    </section>
    <section class="grid-2">
      ${announcements || '<div class="empty">暂无公告。</div>'}
    </section>`
  })
);

for (const lesson of data.lessons) {
  const topicHtml = lesson.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("");
  writePage(
    join("lessons", lesson.slug),
    renderLayout({
      title: lesson.title,
      activeNav: "",
      body: `<section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">${escapeHtml(lessonTypeLabel(lesson.type))}</span>
          <h1>${escapeHtml(lesson.title)}</h1>
          <p>${escapeHtml(lesson.summary)}</p>
          <div class="hero-actions">
            <a class="button primary" href="${withBase(basePath, `slides/${lesson.slug}/`)}">打开在线课件</a>
            <a class="button secondary" href="${withBase(basePath, `pdfs/${lesson.slug}.pdf`)}">下载 PDF</a>
          </div>
        </div>
        <div class="panel">
          <div class="kicker">元数据</div>
          <ul class="list">
            <li>编号：${String(lesson.order).padStart(2, "0")}</li>
            <li>类型：${escapeHtml(lessonTypeLabel(lesson.type))}</li>
            <li>状态：${escapeHtml(lessonStatusLabel(lesson.status))}</li>
            <li>源文件：${escapeHtml(lesson.source)}</li>
          </ul>
        </div>
      </section>
      <section class="grid-2">
        <article class="panel">
          <h2>本讲重点</h2>
          <ul class="topics">${topicHtml}</ul>
        </article>
        <article class="panel">
          <h2>使用方式</h2>
          <ul class="list">
            <li>课件使用 Slidev 编写，默认主题为 Seriph。</li>
            <li>每讲保持“知识梳理 + 典型例题 + 课堂练习 + 课后题”的结构。</li>
            <li>若后续加课，本页将由同一套脚本自动生成。</li>
          </ul>
        </article>
      </section>`
    })
  );
}

writeFileSync(
  join(docsDir, "404.html"),
  renderLayout({
    title: "页面未找到",
    activeNav: "",
    body: `<section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">404</span>
        <h1>页面未找到</h1>
        <p>返回课程首页继续浏览课件与公告。</p>
        <div class="hero-actions">
          <a class="button primary" href="${withBase(basePath, "")}">返回首页</a>
        </div>
      </div>
    </section>`
  })
);

