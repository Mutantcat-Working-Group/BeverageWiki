/**
 * Find and download images for entries that don't have them yet.
 * Searches Open Food Facts by product name and downloads the best match.
 */

import fs from "node:fs";
import path from "node:path";

const DRINKS_DIR = path.resolve(import.meta.dirname, "..", "drinks");
const IMAGES_DIR = path.resolve(import.meta.dirname, "..", "public", "images");

async function searchOFF(query) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || []).filter((p) => p.image_front_url || p.image_url);
  } catch {
    return [];
  }
}

async function downloadImage(url, filePath) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 500) return false; // too small, probably error
    fs.writeFileSync(filePath, buffer);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = fs.readdirSync(DRINKS_DIR).filter((f) => f.endsWith(".zh.md"));

  let found = 0;
  let notFound = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(DRINKS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");

    // Skip if already has images
    if (content.includes("images:")) {
      skipped++;
      continue;
    }

    // Extract title for search
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();

    // Also try manufacturer
    const mfgMatch = content.match(/manufacturer:\s*\n\s*-\s*(.+)$/m);
    const mfg = mfgMatch ? mfgMatch[1].trim() : "";

    // Search queries: try title first, then manufacturer + first word of title
    const queries = [title];
    if (mfg) queries.push(`${mfg} ${title.split(/\s/)[0]}`);

    let imageUrl = null;
    for (const q of queries) {
      const results = await searchOFF(q);
      if (results.length > 0) {
        imageUrl = results[0].image_front_url || results[0].image_url;
        break;
      }
      await new Promise((r) => setTimeout(r, 400));
    }

    if (!imageUrl) {
      console.log(`  NOT FOUND: ${file}`);
      notFound++;
      continue;
    }

    // Download image
    const slug = file.replace(/\.zh\.md$/, "");
    const clean = slug.replace(/[\/\\:*?"<>|]/g, "").replace(/\s+/g, "_");
    const imageName = `${clean}_1.jpg`;
    const localPath = path.join(IMAGES_DIR, imageName);

    const ok = await downloadImage(imageUrl, localPath);
    if (!ok) {
      console.log(`  DOWNLOAD FAIL: ${file}`);
      notFound++;
      continue;
    }

    // Update markdown to add images section
    const publicPath = `/images/${imageName}`;
    const imagesSection = `\nimages:\n  - url: ${publicPath}\n    caption: ${title}\n`;
    // Insert before the url: or contributor: line
    let updated = content;
    if (content.includes("url:")) {
      updated = content.replace(/^(url:)/m, `${imagesSection}\n$1`);
    } else if (content.includes("contributor:")) {
      updated = content.replace(/^(contributor:)/m, `${imagesSection}\n$1`);
    } else {
      updated = content.replace(/^(---\s*)$/m, `$1${imagesSection}`);
    }

    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`  FOUND & DOWNLOADED: ${file} -> ${imageName}`);
    found++;

    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\n=== Done ===`);
  console.log(`Found & downloaded: ${found}`);
  console.log(`Not found on OFF: ${notFound}`);
  console.log(`Already had images: ${skipped}`);
}

main().catch(console.error);
