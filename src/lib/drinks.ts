import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const DRINKS_DIR = path.join(process.cwd(), "drinks");

export type Locale = "zh" | "en";

export type LocalizedString = {
  zh?: string;
  en?: string;
};

export type DrinkFrontmatter = {
  title?: LocalizedString | string;
  description?: Array<LocalizedString> | LocalizedString | string;
  aliases?: Array<LocalizedString>;
  tags?: Array<LocalizedString>;
  manufacturer?: Array<LocalizedString>;
  origin?: Array<LocalizedString>;
  history?: Array<LocalizedString | string>;
  legend?: Array<LocalizedString>;
  ingredients?: Array<LocalizedString>;
  nutrition?: Array<any>;
  images?: Array<any>;
  serving_suggestions?: Array<LocalizedString | string>;
  cultural_notes?: Array<LocalizedString | string>;
  related_drinks?: Array<LocalizedString>;
  url?: Array<string | { href: string; title?: LocalizedString | string }>;
  contributor?: string;
  updated_at?: string;
};

export type DrinkListItem = {
  slug: string;
  title: LocalizedString;
  description?: Array<LocalizedString>;
  aliases?: Array<LocalizedString>;
  tags?: Array<LocalizedString>;
};

function toSlug(fileName: string) {
  return fileName.replace(/\.md$/i, "");
}

function ensureLocalizedString(value: any): LocalizedString {
  if (typeof value === "string") return { zh: value, en: value };
  return value ?? {};
}

function normalizeDescription(value: any): Array<LocalizedString> | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map(ensureLocalizedString);
  return [ensureLocalizedString(value)];
}

function normalizeLocArray(value: any): Array<LocalizedString> | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value.map(ensureLocalizedString);
  return [ensureLocalizedString(value)];
}

export async function listDrinks(): Promise<DrinkListItem[]> {
  const files = await fs.readdir(DRINKS_DIR);
  const items: DrinkListItem[] = [];
  for (const f of files) {
    if (!f.endsWith(".md")) continue;
    const slug = toSlug(f);
    const fm = await readFrontmatter(slug);
    if (!fm) continue;
    const title = ensureLocalizedString(fm.title ?? { zh: slug, en: slug });
    const description = normalizeDescription(fm.description);
    const aliases = normalizeLocArray(fm.aliases);
    const tags = normalizeLocArray(fm.tags);
    items.push({ slug, title, description, aliases, tags });
  }
  return items.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function readDrink(slug: string): Promise<{ frontmatter: DrinkFrontmatter; content: string } | null> {
  const filePath = path.join(DRINKS_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const frontmatter = (parsed.data || {}) as DrinkFrontmatter;
    const content = (parsed.content || "").trim();
    return { frontmatter, content };
  } catch (e) {
    return null;
  }
}

async function readFrontmatter(slug: string): Promise<DrinkFrontmatter | null> {
  const filePath = path.join(DRINKS_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    return (parsed.data || {}) as DrinkFrontmatter;
  } catch {
    return null;
  }
}
