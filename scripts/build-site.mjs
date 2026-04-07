// build-site.mjs
// Assembles the public/ directory from source files.

import { cpSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

const LECTURES = [
  'lecture-01-foundation-linear',
  'lecture-02-string-stack-queue',
  'lecture-03-sorting-tree-search',
  'lecture-04-graph-wrap-up',
  'lecture-05-lab-review',
  'lecture-06-written-review',
];

function copyDir(src, dst) {
  if (!existsSync(src)) return;
  mkdirSync(dst, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dst, entry);
    statSync(s).isDirectory() ? copyDir(s, d) : cpSync(s, d);
  }
}

function build() {
  console.log('🔨 Building site...');

  // Ensure public/slides and public/handouts exist
  mkdirSync(join(PUBLIC, 'slides'), { recursive: true });
  mkdirSync(join(PUBLIC, 'handouts'), { recursive: true });

  // Copy PDFs from slides-pdf/ → public/slides/
  const pdfSrc = join(ROOT, 'slides-pdf');
  const pdfDst = join(PUBLIC, 'slides');
  if (existsSync(pdfSrc)) {
    for (const f of readdirSync(pdfSrc).filter(f => f.endsWith('.pdf'))) {
      cpSync(join(pdfSrc, f), join(pdfDst, f));
      console.log(`  ✓ Copied PDF: ${f}`);
    }
  } else {
    console.log('  ⚠ slides-pdf/ not found, skipping PDFs');
  }

  // Copy handout notebooks: handouts/**/practice.ipynb → public/handouts/{lecture}/practice.ipynb
  const handoutSrc = join(ROOT, 'handouts');
  if (existsSync(handoutSrc)) {
    for (const lecture of LECTURES) {
      const srcPath = join(handoutSrc, lecture, 'practice.ipynb');
      const dstPath = join(PUBLIC, 'handouts', lecture, 'practice.ipynb');
      if (existsSync(srcPath)) {
        mkdirSync(join(PUBLIC, 'handouts', lecture), { recursive: true });
        cpSync(srcPath, dstPath);
        console.log(`  ✓ Copied handout: ${lecture}/practice.ipynb`);
      }
    }
  }

  console.log('✅ Build complete → public/');
}

build();
