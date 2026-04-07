<div align="center">

# Data Structure and Algorithm B · 2026 Spring

**北京大学 · 数据结构与算法 B · 小班课**

Spring 2026 · PKU Course Website

[![Deployment](https://img.shields.io/github/deployments/walkerchx/data-structure-and-algorithm-b-2026spring-pku/github-pages?style=flat-square)](https://github.com/walkerchx/data-structure-and-algorithm-b-2026spring-pku/deployments)
[![Last Commit](https://img.shields.io/github/last-commit/walkerchx/data-structure-and-algorithm-b-2026spring-pku?style=flat-square)](https://github.com/walkerchx/data-structure-and-algorithm-b-2026spring-pku/commits/main)
[![Submodule](https://img.shields.io/badge/submodule-hello--algo-fed?style=flat-square)](https://github.com/krahets/hello-algo)

---

</div>

## 📅 授课计划

| # | 周次 | 日期 | 时间 | 主题 |
|:-:|------|------|------|------|
| 01 | W3  | 3月21日（周六） | 18:40–20:30 | 基础、复杂度与线性表 |
| 02 | W6  | 4月11日（周六） | 18:40–20:30 | 链表、串与线性结构应用 |
| 03 | W8  | 4月25日（周六） | 18:40–20:30 | 排序、树与检索 |
| 04 | W10 | 5月9日（周六）  | 18:40–20:30 | 图算法与综合收束 |
| 05 | W13 | 5月30日（周六） | 18:40–20:30 | 期末上机复习 |
| 06 | W14 | 6月6日（周六）  | 18:40–20:30 | 期末笔试复习 |

---

## 📚 课程资源

### 授课 Slides

| # | 讲次 | Slides | 状态 |
|:-:|------|--------|------|
| L01 | 基础、复杂度与线性表 | [PDF](slides/lecture-01-foundation-linear.pdf) | 📝 制作中 |
| L02 | 链表、串与线性结构应用 | [PDF](slides/lecture-02-string-stack-queue.pdf) | 🔲 待制作 |
| L03 | 排序、树与检索 | [PDF](slides/lecture-03-sorting-tree-search.pdf) | 🔲 待制作 |
| L04 | 图算法与综合收束 | [PDF](slides/lecture-04-graph-wrap-up.pdf) | 🔲 待制作 |
| L05 | 期末上机复习 | [PDF](slides/lecture-05-lab-review.pdf) | 🔲 待制作 |
| L06 | 期末笔试复习 | [PDF](slides/lecture-06-written-review.pdf) | 🔲 待制作 |

### 习题讲义

每讲配套可运行 Jupyter Notebook，含例题与练习题。

| # | 讲次 | Notebook | 浴谷 |
|:-:|------|----------|------|
| L01 | 基础、复杂度与线性表 | [practice.ipynb](handouts/lecture-01-foundation-linear/practice.ipynb) | 🔗 链接待补 |
| L02 | 链表、串与线性结构应用 | [practice.ipynb](handouts/lecture-02-string-stack-queue/practice.ipynb) | 🔗 链接待补 |
| L03 | 排序、树与检索 | [practice.ipynb](handouts/lecture-03-sorting-tree-search/practice.ipynb) | 🔗 链接待补 |
| L04 | 图算法与综合收束 | [practice.ipynb](handouts/lecture-04-graph-wrap-up/practice.ipynb) | 🔗 链接待补 |
| L05 | 期末上机复习 | [practice.ipynb](handouts/lecture-05-lab-review/practice.ipynb) | 🔗 链接待补 |
| L06 | 期末笔试复习 | [practice.ipynb](handouts/lecture-06-written-review/practice.ipynb) | 🔗 链接待补 |

---

## 🗂️ 目录结构

```
hello-algo/          ← 算法学习资源 hub (submodule)
slides/              ← WPS 手绘 Slides PDF（发布版）
handouts/            ← 每讲配套 Jupyter Notebook 习题讲义
reference/           ← 往年参考资料归档（仅供备课参考）
scripts/             ← 构建脚本
public/              ← GitHub Pages 部署目标（自动生成）
private/              ← 行政文件、评分表等（不进 Git）
```

> ⚠️ `private/` 目录不进 Git，包含敏感行政文件。

---

## 🔧 本地构建

```bash
# 安装依赖
npm install

# 本地构建（生成 public/）
npm run build

# 本地预览
npm run preview
```

---

## 🙏 致谢

课程内容参考 [hello-algo](https://github.com/krahets/hello-algo)，一个通俗易懂的算法学习项目。

---

<div align="center">

Made with ❤️ for PKU DS&A Class B · 2026 Spring

</div>
