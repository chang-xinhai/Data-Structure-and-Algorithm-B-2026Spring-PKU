import { existsSync, rmSync, writeFileSync } from "node:fs";
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
if (existsSync(join(rootDir, "handouts"))) {
  copyDir(join(rootDir, "handouts"), join(docsDir, "handouts"));
}

function resourceKindLabel(kind) {
  const labels = {
    reading: "Reading",
    repository: "Repository",
    website: "Website",
    download: "Download"
  };
  return labels[kind] ?? kind;
}

function renderResourceLinks(resources, { compact = false } = {}) {
  if (!resources?.length) {
    return '<div class="empty">暂无外部资源。</div>';
  }

  const className = compact ? "resource-link-list compact" : "resource-link-list";
  return `<div class="${className}">
    ${resources
      .map(
        (resource) => `<a class="resource-link" href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer noopener">
          <span class="resource-topline">
            <span class="pill subtle">${escapeHtml(resourceKindLabel(resource.kind))}</span>
            <span class="resource-arrow">↗</span>
          </span>
          <strong>${escapeHtml(resource.label)}</strong>
          <span>${escapeHtml(resource.note ?? "")}</span>
        </a>`
      )
      .join("")}
  </div>`;
}

function renderNoteStack(notes) {
  if (!notes?.length) {
    return "";
  }

  return `<div class="note-stack">
    ${notes.map((note) => `<div class="note-card">${escapeHtml(note)}</div>`).join("")}
  </div>`;
}

function renderLayout({ title, body, activeNav }) {
  const courseTitle = escapeHtml(data.course.title);
  const titleText = escapeHtml(title);
  const navItems = [
    { href: withBase(basePath, ""), label: "首页", key: "home" },
    { href: withBase(basePath, "resources/"), label: "资源", key: "resources" },
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
  const handoutLink = lesson.handout
    ? `<a class="button secondary" href="${withBase(basePath, lesson.handout)}">题目讲义</a>`
    : "";
  const resourceLink = lesson.resources?.length
    ? `<a class="button tertiary" href="${lessonHref}#resources">补强资源</a>`
    : "";
  return `<article class="lesson-card">
    <div class="lesson-order">${String(lesson.order).padStart(2, "0")}</div>
    <h3>${escapeHtml(lesson.title)}</h3>
    <p>${escapeHtml(lesson.summary)}</p>
    <div class="badge-row">
      <span class="badge">${escapeHtml(lessonTypeLabel(lesson.type))}</span>
      <span class="badge">${escapeHtml(lessonStatusLabel(lesson.status))}</span>
      <span class="badge">${lesson.resources?.length ?? 0} external links</span>
    </div>
    <ul class="topics">${topicHtml}</ul>
    <div class="action-row">
      <a class="button primary" href="${lessonHref}">查看课次页</a>
      <a class="button secondary" href="${slideHref}">在线课件</a>
      <a class="button secondary" href="${pdfHref}">PDF</a>
      ${handoutLink}
      ${resourceLink}
    </div>
  </article>`;
}

function renderResourceCollection(collection) {
  const usageList = collection.usage.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const caveatList = collection.caveats.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const links = renderResourceLinks(collection.links);
  return `<article class="panel resource-collection">
    <div class="eyebrow">${escapeHtml(collection.id)}</div>
    <h2 style="margin-top: 12px">${escapeHtml(collection.title)}</h2>
    <p style="margin-top: 14px">${escapeHtml(collection.summary)}</p>
    <div class="resource-block">
      <div class="kicker">使用方式</div>
      <ul class="list">${usageList}</ul>
    </div>
    <div class="resource-block">
      <div class="kicker">整合边界</div>
      <ul class="list">${caveatList}</ul>
    </div>
    <div class="resource-block">
      <div class="kicker">公开署名与授权</div>
      <p>${escapeHtml(collection.attribution)}</p>
    </div>
    ${links}
  </article>`;
}

function renderLessonResourceCard(lesson) {
  return `<article class="panel resource-lesson">
    <div class="lesson-order">${String(lesson.order).padStart(2, "0")}</div>
    <h3>${escapeHtml(lesson.title)}</h3>
    <p style="margin-top: 12px">${escapeHtml(lesson.summary)}</p>
    ${renderNoteStack(lesson.resourceNotes)}
    ${renderResourceLinks(lesson.resources, { compact: true })}
    <div class="action-row">
      <a class="button secondary" href="${withBase(basePath, `lessons/${lesson.slug}/`)}">打开课次页</a>
      <a class="button secondary" href="${withBase(basePath, `slides/${lesson.slug}/`)}">在线课件</a>
    </div>
  </article>`;
}

function renderLessonResourcesSection(lesson) {
  if (!lesson.resources?.length && !lesson.resourceNotes?.length) {
    return "";
  }

  return `<section class="section-title" id="resources">
      <div>
        <h2>补强资源</h2>
        <p>优先使用本讲对照入口，不要在外部资料站里重新按关键词盲搜。</p>
      </div>
    </section>
    ${renderNoteStack(lesson.resourceNotes)}
    ${renderResourceLinks(lesson.resources)}`;
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
const resourceCollections = data.resourceCollections.map(renderResourceCollection).join("");
const lessonResourceCards = data.lessons.map(renderLessonResourceCard).join("");

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
          <a class="button secondary" href="${withBase(basePath, "resources/")}">打开资源中枢</a>
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
        <p>前 4 次课覆盖全部核心大纲，第 5 次课做上机复习，第 6 次课做笔试复习。课次页现在同时提供课件、PDF、讲义和 Hello 算法对照资源。</p>
      </div>
    </section>
    <section class="lesson-grid">${lessonCards}</section>
    <section class="section-title">
      <div>
        <h2>补强资源库</h2>
        <p>把优质公开资源纳入同一套元数据管理，而不是手工在各页乱放链接。</p>
      </div>
      <a class="button secondary" href="${withBase(basePath, "resources/")}">查看完整对照</a>
    </section>
    <section class="resource-collection-grid">${resourceCollections}</section>
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
  "resources",
  renderLayout({
    title: "资源中枢",
    activeNav: "resources",
    body: `<section class="hero">
      <div class="hero-copy">
        <span class="eyebrow">Resource Hub</span>
        <h1>资源中枢</h1>
        <p>当前先接入 Hello 算法，形成“官网图解 + GitHub 代码 + 逐讲导读”的统一入口。后续若要接入更多公开资源，也继续走同一套元数据和页面结构。</p>
      </div>
      <div class="panel">
        <div class="kicker">使用原则</div>
        <ul class="list">
          <li>本仓库课件负责授课主线，外部资源负责补图解、补代码、补回看。</li>
          <li>所有外部链接统一挂在课程元数据下，避免站点多处重复维护。</li>
          <li>如未来需要本地镜像资源，应先补署名与授权说明，再决定是否纳入仓库。</li>
        </ul>
      </div>
    </section>
    <section class="resource-collection-grid">${resourceCollections}</section>
    <section class="section-title">
      <div>
        <h2>逐讲对照</h2>
        <p>每讲都给出最值得打开的外部链接，方便备课、讲课和学生补弱。</p>
      </div>
    </section>
    <section class="resource-lesson-grid">${lessonResourceCards}</section>`
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
        <p>使用统一元数据管理课次状态、内容摘要和公开入口。后续加课时无需改站点代码，资源中枢也会自动扩展。</p>
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
            <div class="badge-row">
              <span class="badge">${lesson.resources?.length ?? 0} external links</span>
            </div>
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
  const handoutMeta = lesson.handout ? `<li>讲义：${escapeHtml(lesson.handout)}</li>` : "";
  const handoutAction = lesson.handout
    ? `<a class="button secondary" href="${withBase(basePath, lesson.handout)}">下载题目讲义</a>`
    : "";
  const resourceAction = lesson.resources?.length
    ? `<a class="button tertiary" href="#resources">查看补强资源</a>`
    : "";

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
            ${handoutAction}
            ${resourceAction}
          </div>
        </div>
        <div class="panel">
          <div class="kicker">元数据</div>
          <ul class="list">
            <li>编号：${String(lesson.order).padStart(2, "0")}</li>
            <li>类型：${escapeHtml(lessonTypeLabel(lesson.type))}</li>
            <li>状态：${escapeHtml(lessonStatusLabel(lesson.status))}</li>
            <li>源文件：${escapeHtml(lesson.source)}</li>
            <li>外部资源：${lesson.resources?.length ?? 0} 条</li>
            ${handoutMeta}
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
            <li>题目讲义使用 Jupyter Notebook 维护，便于按题型增补与发放。</li>
            <li>外部资源页统一挂在元数据下，后续扩展不改页面模板。</li>
          </ul>
        </article>
      </section>
      ${renderLessonResourcesSection(lesson)}`
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
        <p>返回课程首页继续浏览课件、资源和公告。</p>
        <div class="hero-actions">
          <a class="button primary" href="${withBase(basePath, "")}">返回首页</a>
        </div>
      </div>
    </section>`
  })
);
