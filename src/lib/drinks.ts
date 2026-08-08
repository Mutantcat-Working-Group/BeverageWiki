import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const DRINKS_DIR = path.join(process.cwd(), "drinks");

export type Locale = string;

export type DrinkFrontmatter = {
  title?: string;
  description?: string[];
  aliases?: string[];
  tags?: string[];
  manufacturer?: string[];
  origin?: string[];
  history?: string[];
  legend?: string[];
  ingredients?: string[];
  nutrition?: Array<Record<string, string>>;
  images?: Array<{ url: string; type?: string; caption?: string }>;
  serving_suggestions?: string[];
  cultural_notes?: string[];
  related_drinks?: string[];
  url?: Array<string | { href: string; title?: string }>;
  contributor?: string;
  updated_at?: string;
};

export type DrinkListItem = {
  slug: string;
  defaultTitle: string;
  locales: string[];
  tags?: string[];
};

export type DrinkDetailData = {
  slug: string;
  locales: Record<string, { frontmatter: DrinkFrontmatter; content: string }>;
  defaultLocale: string;
};

/** Extract slug and locale from filename like "CocaCola_Can_330ml.en.md" */
function parseDrinkFileName(fileName: string): { slug: string; locale: string } | null {
  if (!fileName.endsWith(".md")) return null;
  const base = fileName.slice(0, -3); // remove .md
  const lastDot = base.lastIndexOf(".");
  if (lastDot === -1) {
    // No locale suffix — treat as default "zh" for backward compatibility
    return { slug: base, locale: "zh" };
  }
  const maybeLocale = base.slice(lastDot + 1);
  // Locale codes: 2-letter (zh, en, ja, ko) or 5-char (zh-TW)
  if (/^[a-z]{2}(-[A-Z]{2})?$/.test(maybeLocale)) {
    return { slug: base.slice(0, lastDot), locale: maybeLocale };
  }
  // Not a locale — treat whole thing as slug with default locale
  return { slug: base, locale: "zh" };
}

function readFrontmatterSync(filePath: string): DrinkFrontmatter | null {
  // We'll use async version below
  return null;
}

async function readDrinkFile(
  filePath: string
): Promise<{ frontmatter: DrinkFrontmatter; content: string } | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    return {
      frontmatter: (parsed.data || {}) as DrinkFrontmatter,
      content: (parsed.content || "").trim(),
    };
  } catch {
    return null;
  }
}

const LOCALE_PRIORITY: Record<string, string[]> = {
  zh: ["zh", "en"],
  en: ["en", "zh"],
  ja: ["ja", "zh", "en"],
  ko: ["ko", "zh", "en"],
};

/** Resolve the best locale to display */
function resolveLocale(available: string[], preferred?: string): string {
  if (preferred && available.includes(preferred)) return preferred;
  // Try fallback chain
  const chain = LOCALE_PRIORITY[preferred || ""] || ["en", "zh"];
  for (const loc of chain) {
    if (available.includes(loc)) return loc;
  }
  // First available
  return available[0];
}

export async function listDrinks(): Promise<DrinkListItem[]> {
  const files = await fs.readdir(DRINKS_DIR);

  // Group files by slug
  const slugMap = new Map<string, { locales: Map<string, string> }>();

  for (const f of files) {
    const parsed = parseDrinkFileName(f);
    if (!parsed) continue;
    const { slug, locale } = parsed;
    if (!slugMap.has(slug)) {
      slugMap.set(slug, { locales: new Map() });
    }
    slugMap.get(slug)!.locales.set(locale, path.join(DRINKS_DIR, f));
  }

  const items: DrinkListItem[] = [];

  for (const [slug, { locales }] of slugMap) {
    // Read the first available locale to get default title & tags
    const firstLocale = locales.get("zh") || locales.get("en") || locales.values().next().value!;
    const data = await readDrinkFile(firstLocale);
    if (!data) continue;

    const defaultTitle = data.frontmatter.title || slug;
    items.push({
      slug,
      defaultTitle,
      locales: Array.from(locales.keys()).sort(),
      tags: data.frontmatter.tags,
    });
  }

  return items.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function readDrink(slug: string): Promise<DrinkDetailData | null> {
  const files = await fs.readdir(DRINKS_DIR);

  const localeFiles = new Map<string, string>();
  for (const f of files) {
    const parsed = parseDrinkFileName(f);
    if (!parsed || parsed.slug !== slug) continue;
    localeFiles.set(parsed.locale, path.join(DRINKS_DIR, f));
  }

  if (localeFiles.size === 0) return null;

  const locales: Record<string, { frontmatter: DrinkFrontmatter; content: string }> = {};

  for (const [locale, filePath] of localeFiles) {
    const data = await readDrinkFile(filePath);
    if (data) {
      locales[locale] = data;
    }
  }

  const defaultLocale = locales["zh"] ? "zh" : locales["en"] ? "en" : Object.keys(locales)[0];

  return { slug, locales, defaultLocale };
}
