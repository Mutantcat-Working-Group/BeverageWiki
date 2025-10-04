export type Locale = "zh" | "en";
export type LocalizedString = { zh?: string; en?: string };

export function pickLocale(ls: LocalizedString | undefined, locale: Locale): string | undefined {
  if (!ls) return undefined;
  return (ls as any)[locale] || (ls as any)[locale === "zh" ? "en" : "zh"];
}
