# Data Structure and Algorithm B · 2026 Spring

Course website repo for PKU Data Structure and Algorithm B small-class (数算B小班课), Spring 2026.

## Course Plan

| # | Week | Date | Time | Lecture | Topic |
|---|------|------|------|---------|-------|
| 01 | W3 | Sat Mar 21 | 18:40–20:30 | 基础、复杂度与线性表 | Foundations, complexity, linear tables |
| 02 | W6 | Sat Apr 11 | 18:40–20:30 | 链表、串与线性结构应用 | Linked lists, strings, applications of linear structures |
| 03 | W8 | Sat Apr 25 | 18:40–20:30 | 排序、树与检索 | Sorting, trees, and searching |
| 04 | W10 | Sat May 9 | 18:40–20:30 | 图算法与综合收束 | Graph algorithms and synthesis |
| 05 | W13 | Sat May 30 | 18:40–20:30 | 期末上机复习 | Lab review |
| 06 | W14 | Sat Jun 6 | 18:40–20:30 | 期末笔试复习 | Written exam review |

## Repository Structure

```
hello-algo/          # Submodule: krahets/hello-algo (resource hub)
slides/              # WPS PPTX source files (hand-authored)
slides-pdf/          # PDF exports from WPS (lecture slides for web)
handouts/            # .ipynb practice notebooks (runnable, self-contained)
reference/           # Archived materials from prior years (read-only reference)
  ├── lectures/      # Prior-year lecture PDFs
  ├── homework/      # Prior-year homework PDFs/DOCX
  ├── review-sessions/
  └── ...
public/              # Build output (GitHub Pages deployment target)
scripts/             # Build scripts
.github/workflows/   # GitHub Actions
private/             # Admin files (grading sheets, course plan docs) — NEVER commit
```

## Content Naming Convention

### Slides (PPTX → PDF)

Source PPTX lives in `slides/`. After exporting to PDF via WPS, place in `slides-pdf/` with the canonical name:

| Lecture | Filename |
|---------|----------|
| L01 | `lecture-01-foundation-linear.pdf` |
| L02 | `lecture-02-string-stack-queue.pdf` |
| L03 | `lecture-03-sorting-tree-search.pdf` |
| L04 | `lecture-04-graph-wrap-up.pdf` |
| L05 | `lecture-05-lab-review.pdf` |
| L06 | `lecture-06-written-review.pdf` |

### Handouts

Each lecture has a `handouts/` subdirectory:
```
handouts/lecture-01-foundation-linear/practice.ipynb
handouts/lecture-02-string-stack-queue/practice.ipynb
...
```

## Workflow

1. **Authoring**: Slides are hand-made in WPS, exported as PDF. Practice notebooks are `.ipynb` files in `handouts/`.
2. **Building**: `scripts/build-site.mjs` assembles `public/` from source files.
3. **Publishing**: GitHub Actions on push to `main` builds and deploys to GitHub Pages.

## Design Direction

- **Style**: macOS-inspired, minimalist, premium
- **Typography**: SF Pro / system-ui stack
- **Color**: Near-white background, deep charcoal text, subtle blue accent
- **Layout**: Generous whitespace, clean card-based lecture listing

## Development Practices

### Version Control

- **Commits follow [Conventional Commits](https://www.conventionalcommits.org/)**:
  - `feat:` new feature or content (e.g., `feat: add lecture-03 slides and handout`)
  - `fix:` bug fix (e.g., `fix: correct PDF naming in build script`)
  - `docs:` documentation only
  - `refactor:` code restructure without behavior change
  - `chore:` build script, dependency updates, config changes

- **Commit + push promptly**: After each unit of work is confirmed working (build succeeds, site renders correctly, Actions green), commit immediately and push. Do not batch multiple unrelated changes into one commit.

- **Branch strategy**: Work on feature branches; merge to `main` via PR or direct push after review. `main` is always deployable.

### Build & Test Loop

1. Make a small, focused change (e.g., add one lecture's PDF, update one notebook).
2. Run `node scripts/build-site.mjs` locally to verify the build succeeds.
3. If the build passes, commit with a descriptive Conventional Commits message and push.
4. GitHub Actions will auto-deploy to GitHub Pages.

## Key Constraints

- `private/` is gitignored — never leave sensitive files in tracked paths
- All course content (slides, handouts, reference) goes in git
- `hello-algo/` is a submodule — do not edit directly; pull updates from upstream
- PDF filenames in `slides-pdf/` must match the canonical naming table above for consistent URL routing

### PPTX Workflow

初始化新章节 pptx 时，**永远复制上一个文件再重命名**，而不是重头构建：

```bash
# L2 初始化（复制 L1）
cp "slides-pptx/L1 基础、复杂度和线性表.pptx" "slides-pptx/L2 栈、队列和递归.pptx"

# L3 初始化（复制 L2）
cp "slides-pptx/L2 栈、队列和递归.pptx" "slides-pptx/L3 排序、树与检索.pptx"
```

PDF 归档到 `slides pdf/` 目录。
