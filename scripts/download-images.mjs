/**
 * Download all drink images from URLs in markdown files to public/images/
 */

import fs from "node:fs";
import path from "node:path";

const DRINKS_DIR = path.resolve(import.meta.dirname, "..", "drinks");
const IMAGES_DIR = path.resolve(import.meta.dirname, "..", "public", "images");

async function downloadImage(url, filePath) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  FAIL (${res.status}): ${url}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    console.log(`  OK: ${path.basename(filePath)} (${buffer.length} bytes)`);
    return true;
  } catch (e) {
    console.log(`  ERROR: ${e.message}`);
    return false;
  }
}

function extractImageUrls(content) {
  const urls = [];
  // Match: - url: https://...
  const urlRegex = /^\s*-\s*url:\s*(https?:\/\/\S+)/gm;
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function slugToImageName(slug, index) {
  // Clean slug for filename
  const clean = slug
    .replace(/[\/\\:*?"<>|]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_{2,}/g, "_");
  return `${clean}_${index}.jpg`;
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const files = fs.readdirSync(DRINKS_DIR).filter((f) => f.endsWith(".zh.md"));

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(DRINKS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const slug = file.replace(/\.zh\.md$/, "");

    const imageUrls = extractImageUrls(content);
    if (imageUrls.length === 0) continue;

    console.log(`\n${file} (${imageUrls.length} images)`);

    let updatedContent = content;

    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const imageName = slugToImageName(slug, i + 1);
      const localPath = path.join(IMAGES_DIR, imageName);
      const publicPath = `/images/${imageName}`;

      // Skip if already downloaded
      if (fs.existsSync(localPath)) {
        console.log(`  EXISTS: ${imageName}`);
        // Still update the reference
        updatedContent = updatedContent.replace(url, publicPath);
        skipped++;
        continue;
      }

      const ok = await downloadImage(url, localPath);
      if (ok) {
        // Update markdown to reference local image
        updatedContent = updatedContent.replace(url, publicPath);
        downloaded++;
      } else {
        failed++;
      }

      // Rate limit
      await new Promise((r) => setTimeout(r, 200));
    }

    // Write updated markdown if changed
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, "utf8");
    }
  }

  console.log(`\n=== Done ===`);
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped (existing): ${skipped}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
