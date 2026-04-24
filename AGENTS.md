# Data Structure and Algorithm B · 2026 Spring

Course website repo for PKU Data Structure and Algorithm B small-class (数算 B 小班课), Spring 2026.

## Language Policy

This file must stay in **English only**.

For all actual collaboration in this repository, default to **Chinese**:

- agent conversation with the user
- generated course content
- slide copywriting
- notebook handouts
- website-facing course materials

Use English only when a file explicitly requires it, or when an external format / API / tool convention makes English the better choice.

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

```text
hello-algo/          # Submodule: krahets/hello-algo (resource hub)
slides/              # WPS PPTX source files (hand-authored)
slides-pdf/          # PDF exports from WPS (lecture slides for web)
handouts/            # .ipynb practice notebooks (runnable, self-contained)
reference/           # Archived and external reference materials
  ├── lectures/      # Prior-year lecture PDFs
  ├── homework/      # Prior-year homework PDFs/DOCX
  ├── review-sessions/
  ├── openjudge/     # Crawled OpenJudge problem statements / caches
  └── openjudge-crawler/
public/              # Build output (GitHub Pages deployment target)
scripts/             # Build scripts
.github/workflows/   # GitHub Actions
private/             # Admin files (grading sheets, course plan docs) — NEVER commit
```

## Canonical Naming Convention

### Slide PDFs

After exporting PPTX to PDF, place the result in `slides-pdf/` using the canonical filename below.

| Lecture | Filename |
|---------|----------|
| L01 | `lecture-01-foundation-linear.pdf` |
| L02 | `lecture-02-string-stack-queue.pdf` |
| L03 | `lecture-03-sorting-tree-search.pdf` |
| L04 | `lecture-04-graph-wrap-up.pdf` |
| L05 | `lecture-05-lab-review.pdf` |
| L06 | `lecture-06-written-review.pdf` |

### Handouts

Each lecture has its own practice notebook:

```text
handouts/lecture-01-foundation-linear/practice.ipynb
handouts/lecture-02-string-stack-queue/practice.ipynb
handouts/lecture-03-sorting-tree-search/practice.ipynb
handouts/lecture-04-graph-wrap-up/practice.ipynb
handouts/lecture-05-lab-review/practice.ipynb
handouts/lecture-06-written-review/practice.ipynb
```

## Core Working Style

### Design Direction

- **Style**: macOS-inspired, minimalist, premium
- **Typography**: SF Pro / system-ui stack
- **Color**: near-white background, deep charcoal text, subtle blue accent
- **Layout**: generous whitespace, clean hierarchy, calm high-end visual rhythm
- **Writing quality**: polished, elegant, structured, publication-ready

### Scope Discipline

- Stay tightly aligned with the lecture topic of the current session.
- Prefer high-signal, well-structured teaching materials over verbose coverage.
- When generating teaching content, optimize for actual classroom delivery, not only for completeness.
- Favor classic, representative, discussion-worthy problems over noisy problem lists.

## Full Lecture Workflow

The agent should be deeply familiar with the full workflow of **preparation → teaching support → post-class publishing**, and should proactively collaborate with the user through each stage.

---

## Phase A — Pre-class Preparation

### A1. Confirm the lecture topic

For each new lecture:

1. Read the teaching plan and identify the current lecture topic.
2. Map the lecture index `L{i}` to its corresponding slide deck, handout folder, and publishing targets.
3. Use the lecture naming in `README.md` as the source of truth for naming.

### A2. Refresh OpenJudge references

Before planning practice problems, use `reference/openjudge-crawler/` to fetch the latest problem data.

Key locations:

- crawler directory: `reference/openjudge-crawler/`
- config file: `reference/openjudge-crawler/config.json`
- cache output: `reference/openjudge/`

Typical commands:

```bash
# Update all configured OpenJudge sources
python3 reference/openjudge-crawler/crawler.py

# Crawl one base
python3 reference/openjudge-crawler/crawler.py --base http://xlxxsjjg.openjudge.cn/

# Crawl one contest
python3 reference/openjudge-crawler/crawler.py --contest 2026hw4
```

Notes:

- Default behavior is incremental crawling.
- Use `--force` only when an overwrite is truly needed.
- After crawling, inspect newly added materials under `reference/openjudge/`.

### A3. Build the lecture plan from multiple sources

When preparing a lecture, synthesize ideas from all of the following:

- the current lecture topic from the teaching plan
- the corresponding PDFs under `reference/lectures/`
- the relevant chapters of `hello-algo/`
- <https://github.com/krahets/hello-algo>
- <https://www.hello-algo.com/>
- newly crawled OpenJudge problem information

The goal is not to mechanically merge sources, but to design a coherent teaching arc with strong motivation, intuitive explanation, and good classroom pacing.

### A4. Enforce the 2-hour structure

Each 2-hour class should be designed as:

- **1 hour** for concept teaching
- **1 hour** for guided problem solving

#### Knowledge-teaching segment

For the first hour:

- use Hello Algo as the main structural backbone
- extend appropriately with content from the PDF references
- add extra explanations, examples, contrasts, or intuition when they improve teaching quality
- keep the narrative classroom-friendly and conceptually layered

#### Practice segment

For the second hour:

- center the exercises on the lecture’s core concepts
- use OpenJudge as the main reference pool
- then search in Luogu for strong corresponding problems suitable for live class practice

### A5. Prepare the PPTX starter file

The user creates lecture slides in `slides-pptx/`.

For each new lecture `L{i}`:

- directly copy the previous lecture PPTX `L{i-1}`
- rename it using the lecture title from `README.md`
- place it in `slides-pptx/`
- do this proactively so the user can immediately start editing
- preserve the previous lecture structure as a reusable template/reference

Rule:

> Never start a new lecture PPTX from scratch when a previous PPTX exists. Always duplicate the previous lecture PPTX first, then rename it.

Example pattern:

```bash
cp "slides-pptx/L1 基础、复杂度和线性表.pptx" "slides-pptx/L2 栈、队列和递归.pptx"
cp "slides-pptx/L2 栈、队列和递归.pptx" "slides-pptx/L3 排序、树与检索.pptx"
```

---

## Phase B — Practice Set Design

### B1. Select Luogu problems for class practice

For each lecture, after identifying the core concepts:

1. use OpenJudge references to understand the classic problem space
2. search Luogu for the most representative corresponding problems
3. add the selected problems to the course team list for the current lecture:
   - <https://www.luogu.com.cn/team/125649>
   - current lecture list name: `L{i} Practice`

### B2. Problem selection criteria

The selected problem set should satisfy all of the following whenever possible:

- strongly tied to the lecture’s core knowledge point
- classic and widely representative
- medium difficulty for classroom use
- non-trivial, with enough depth for discussion
- suitable for explaining one-problem-multiple-solutions or multiple-problems-one-pattern
- each selected core problem should ideally have **at least two meaningful variants** for extension and discussion

### B3. Size of the problem set

Keep the lecture practice set to:

- **3–5 problems total**

This is the target size for a 1-hour in-class problem-solving session.

---

## Phase C — Handout Authoring

After the Luogu practice problems are confirmed, write the notebook for the current lecture’s practice handout.

### C1. Target file

Write into the lecture-matched notebook, for example:

```text
handouts/lecture-02-string-stack-queue/practice.ipynb
```

Always use the notebook for the current lecture.

### C2. Handout quality standard

The handout will later be published on the course website, so it must be:

- cleanly structured
- visually polished
- publication-ready
- elegant in markdown hierarchy and pacing
- suitable both for live teaching and later self-study

### C3. Required structure for each problem

For each selected problem, include all of the following in Chinese:

1. **Problem statement**
   - complete and readable
   - clearly describes input, output, and key constraints

2. **Idea / solution analysis**
   - explain the reasoning carefully
   - use mathematical notation where helpful
   - clarify invariants, complexity, edge cases, and why the method works

3. **Reference code**
   - Python
   - classroom-friendly and readable

4. **Variant discussion**
   - at least **two variants** for each problem
   - each variant must include:
     - the variant problem
     - the core idea
     - reference code

5. **Final takeaway / summary**
   - compare the variants briefly
   - summarize difficulty, key insights, and recommended approach
   - highlight what is most worth remembering in class

---

## Phase D — Final Pre-class Checklist

Before class, make sure the following are prepared:

- PPTX source file is ready
- practice notebook is ready
- the user has provided the OpenJudge / OJ link for this lecture
- the website entry for this lecture is updated with the OJ link

### Reminder responsibilities

The agent should also proactively remind the user of the pre-class logistics:

- leave about **30 minutes early** for preparation
- do not forget to **charge the MacBook**
- use **sync** to ensure materials are available on the MacBook

If the OJ link is still missing, explicitly remind the user to provide it.

---

## Phase E — Post-class Publishing

When the user says to publish the lecture materials to the website, follow this release workflow.

### E1. Guide the user to export slides manually

The user should be guided to manually export the PPTX to PDF first.

The agent should explicitly remind the user to do this manual export before website publishing continues.

### E2. Publish lecture resources to the website

After the PDF export is available, update the website with:

- the practice notebook link
- the slide PDF link
- the lecture’s OJ link if needed

Follow the same publishing form and style as Lecture 02.

### E3. Publishing standard

The website update should be:

- visually consistent with existing lecture entries
- concise and clean
- aligned with the current site design language

---

## Build and Publish Workflow

1. **Authoring**: slides are edited in WPS as PPTX; practice notebooks are written as `.ipynb`.
2. **Building**: `scripts/build-site.mjs` assembles `public/` from source files.
3. **Publishing**: GitHub Actions on push to `main` builds and deploys to GitHub Pages.

### Local commands

```bash
npm run build   # build output to public/
npm run preview # local preview (run build first)
git push        # trigger CI and GitHub Pages deployment
```

## Development Practices

### Version Control

- **Commits follow [Conventional Commits](https://www.conventionalcommits.org/)**:
  - `feat:` new feature or content
  - `fix:` bug fix
  - `docs:` documentation only
  - `refactor:` code restructure without behavior change
  - `chore:` build script, dependency updates, config changes

- **Commit and push promptly** after each confirmed, coherent unit of work.
- Do not batch unrelated changes into one commit.
- Prefer feature branches; keep `main` deployable.

### Build / test loop

1. Make a focused change.
2. Run `node scripts/build-site.mjs` locally.
3. If the build passes, commit with a clear Conventional Commits message.
4. Push and let GitHub Actions deploy.

## Deployment Notes

### GitHub Pages deployment

- push triggers the `Deploy to GitHub Pages` workflow
- `npm run build` copies `slides-pdf/*.pdf` and `handouts/**/practice.ipynb` into `public/`
- HTML/CSS source under `public/` is already tracked and does not need a separate generation step
- after deployment, GitHub Pages may cache aggressively; use `Cmd+Shift+R` for a hard refresh when checking updates

### Shields.io badges

Emoji may break badge URLs. Prefer plain text parameters.

```md
<!-- Avoid -->
![Website](https://img.shields.io/badge/website-🚀-?style=flat-square)

<!-- Prefer -->
![Website](https://img.shields.io/website?down_message=offline&style=flat-square&up_message=online&url=...)
```

### PDF preview rules

- Do **not** use GitHub raw URLs for PDF viewing
- Use relative paths in the website, such as `slides/L1.pdf`
- GitHub Pages will serve deployed PDFs with the correct `Content-Type: application/pdf`
- If linking from `README.md`, prefer the GitHub Pages URL, not the raw GitHub file URL

## Key Constraints

- `private/` is gitignored — never place sensitive content in tracked paths
- all course content belongs in git unless explicitly private
- `hello-algo/` is a submodule — do not edit it directly
- slide PDF filenames in `slides-pdf/` must match the canonical naming table for stable routing
- `AGENTS.md` stays in English, but normal repo collaboration and generated course content stay in Chinese
