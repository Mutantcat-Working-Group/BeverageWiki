#!/usr/bin/env node
/*
  Sync images/ -> public/images/ so that paths like /images/xxx.jpg are served by Next.js.
  Safe to run multiple times; skips if source doesn't exist.
*/
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, 'images');
const destDir = path.join(projectRoot, 'public', 'images');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  if (!fs.existsSync(srcDir)) {
    console.info('[sync-images] skip: no images/ directory');
    process.exit(0);
  }
  copyRecursive(srcDir, destDir);
  console.info(`[sync-images] synced images -> ${path.relative(projectRoot, destDir)}`);
} catch (err) {
  console.error('[sync-images] failed:', err);
  process.exit(1);
}
