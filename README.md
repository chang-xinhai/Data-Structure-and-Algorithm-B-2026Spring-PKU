# Data Structure and Algorithm B · 2026 Spring

数据结构与算法 B 小班课仓库，采用 `Slidev` 维护课件，自动生成静态课程网站并导出 PDF，并通过统一元数据整合 `Hello 算法` 作为公开补强资源库。

## Local Preview

```bash
npm install
npm run dev
```

默认会先重建课程网站和 6 讲在线课件，然后在 `http://localhost:4173` 提供本地预览。

如果只想构建不启动服务：

```bash
npm run build
```

## Structure

- `content/course.json`: 课程主页、公告、课次元数据
- `slides/`: 每讲一个 Slidev 入口
- `public/`: 课程站点静态资源
- `scripts/`: 站点生成、课件构建、PDF 导出、脚手架
- `resources/`: 由 `content/course.json` 的外部资源元数据生成
- `materials/official/`: 本学期官方资料与工作规范
- `reference/`: 往年教学资源归档，已按类别整理
- `private/`: 私有管理材料，不纳入 Git
- `docs/`: 构建产物目录，供 GitHub Pages 发布

## Commands

```bash
npm install
npm run dev
npm run build
npm run export
npm run new:lesson -- 7 lecture-07-extra "Lecture 07 · 加课主题"
```

## Course Plan

1. `Lecture 01 · 基础、复杂度与线性表`
2. `Lecture 02 · 链表、串与线性结构应用`
3. `Lecture 03 · 排序、树与检索`
4. `Lecture 04 · 图算法与综合收束`
5. `Lecture 05 · 上机复习`
6. `Lecture 06 · 笔试复习`

前 4 讲覆盖全部主课程大纲，最后 2 讲分别做上机复习和笔试复习。仓库按元数据驱动，后续可以增加 `Lecture 07+` 而不重构站点。

## External Resource Strategy

当前已接入 `Hello 算法`（[官网](https://www.hello-algo.com/) / [仓库](https://github.com/krahets/hello-algo)）：

- 首页展示资源中枢入口与公开授权说明
- `/resources/` 页面提供课程级说明和逐讲对照阅读入口
- 每个课次页展示该讲最值得打开的外部资源链接与使用提示

原则是“本仓库讲主线，外部资源补图解、补代码、补回看”，所有链接统一维护在 `content/course.json`，不在多个页面手工重复维护。
