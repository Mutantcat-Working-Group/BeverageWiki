"use client";
import React from "react";
import Link from "next/link";
import { useI18n, useTranslation } from "@/i18n/Provider";
import { LocalizedString } from "@/lib/i18n";

function pick(ls?: LocalizedString, locale: "zh" | "en" = "zh") {
  if (!ls) return undefined;
  return (ls as any)[locale] || (ls as any)[locale === "zh" ? "en" : "zh"];
}

export default function DrinkDetail({
  frontmatter,
  contentHtml,
}: {
  frontmatter: any;
  contentHtml: string;
}) {
  const { t } = useTranslation();
  const { locale } = useI18n();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-4 sm:p-5 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );

  const ChipList = ({ items }: { items: (string | undefined)[] }) => {
    const chips = items.filter(Boolean) as string[];
    if (!chips.length) return null;
    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
            title={c}
          >
            {c}
          </span>
        ))}
      </div>
    );
  };

  const toDisplay = (v: any) => {
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    if (v === undefined || v === null) return "";
    return String(v);
  };

  const renderList = (arr?: any[], mapper?: (x: any) => string | undefined) => {
    if (!arr || arr.length === 0) return null;
    return (
      <ul className="list-disc pl-6 space-y-1 marker:text-neutral-400">
        {arr.map((x, i) => {
          const text = mapper ? mapper(x) : String(x);
          if (!text) return null;
          return (
            <li key={i} className="text-neutral-800 dark:text-neutral-200 text-sm leading-6">
              {text}
            </li>
          );
        })}
      </ul>
    );
  };

  const descriptions: any[] = React.useMemo(() => {
    const d = frontmatter?.description;
    if (!d) return [];
    return Array.isArray(d) ? d : [d];
  }, [frontmatter]);

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Localized Title */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {pick(frontmatter?.title, locale) || pick(frontmatter?.title, locale === "zh" ? "en" : "zh")}
        </h1>
        {/* Tags & Aliases as chips */}
        <div className="flex flex-col gap-3">
          {Array.isArray(frontmatter?.tags) && frontmatter.tags.length > 0 ? (
            <div className="flex items-start gap-2">
              <span className="text-xs uppercase tracking-wide text-neutral-500 mt-1">{t("tags")}</span>
              <ChipList
                items={frontmatter.tags.map((x: any) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
              />
            </div>
          ) : null}
          {Array.isArray(frontmatter?.aliases) && frontmatter.aliases.length > 0 ? (
            <div className="flex items-start gap-2">
              <span className="text-xs uppercase tracking-wide text-neutral-500 mt-1">{t("aliases")}</span>
              <ChipList
                items={frontmatter.aliases.map((x: any) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
              />
            </div>
          ) : null}
        </div>
      </div>
      {descriptions.length > 0 && (
        <div className="space-y-3">
          {descriptions.map((d, i) => {
            const txt =
              typeof d === "string"
                ? d
                : (pick(d, locale) || pick(d, locale === "zh" ? "en" : "zh"));
            if (!txt) return null;
            return (
              <p key={i} className="text-neutral-700 dark:text-neutral-300 text-base leading-7">
                {txt}
              </p>
            );
          })}
        </div>
      )}

      {/* Manufacturer & Origin */}
      {renderList(frontmatter?.manufacturer, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")) && (
        <Section title={t("manufacturer")}>
          {renderList(frontmatter.manufacturer, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
        </Section>
      )}

      {renderList(frontmatter?.origin, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")) && (
        <Section title={t("origin")}>
          {renderList(frontmatter.origin, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
        </Section>
      )}

      {renderList(frontmatter?.history, (x) => (typeof x === "string" ? x : (pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")))) && (
        <Section title={t("history")}>
          {renderList(frontmatter.history, (x) => (typeof x === "string" ? x : (pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))))}
        </Section>
      )}

      {renderList(frontmatter?.legend, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")) && (
        <Section title={t("legend")}>
          {renderList(frontmatter.legend, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
        </Section>
      )}

      {renderList(frontmatter?.ingredients, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")) && (
        <Section title={t("ingredients")}>
          {renderList(frontmatter.ingredients, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
        </Section>
      )}

      {/* Nutrition: robust locale-aware handling for multiple shapes */}
      {(() => {
        const loc = locale;
        const alt = loc === "zh" ? "en" : "zh";

        // Accept either an array or an object with locale arrays
        let items: any[] | undefined = undefined;
        const n = frontmatter?.nutrition;
        if (Array.isArray(n)) {
          items = n;
        } else if (n && (Array.isArray(n?.[loc]) || Array.isArray(n?.[alt]))) {
          items = n?.[loc] || n?.[alt];
        }
        if (!items || items.length === 0) return null;

        const getLabel = (o: any): string | undefined =>
          o?.项目 || o?.名称 || o?.营养素 || o?.item || o?.name || o?.label;
        const getValue = (o: any): string | undefined =>
          o?.数值 || o?.含量 || o?.值 || o?.value || o?.amount;
        const getUnit = (o: any): string | undefined => o?.单位 || o?.unit;
        const getDaily = (o: any): string | undefined =>
          o?.每日 || o?.每日摄入百分比 || o?.daily || o?.dv || o?.percent;

        const toKV = (entry: any): { label?: string; value?: string; daily?: string } => {
          if (!entry) return {};
          // Case: string like "Label: Value"
          if (typeof entry === "string") {
            const parts = entry.split(":");
            if (parts.length >= 2) {
              const label = parts[0].trim();
              const value = parts.slice(1).join(":").trim();
              return { label, value };
            }
            return { value: entry };
          }
          // Case: object possibly has locale child or is the object itself
          const o = entry?.[loc] || entry?.[alt] || entry;
          const label = getLabel(o);
          const unit = getUnit(o);
          const daily = getDaily(o);
          const v = getValue(o);
          const value = [v, unit].filter(Boolean).join(" ");
          return { label, value, daily };
        };

        return (
          <Section title={t("nutrition")}>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-600 dark:text-neutral-400 border-b border-neutral-200/60 dark:border-neutral-800">
                    <th className="py-2 pr-4">{t("nutrition")}</th>
                    <th className="py-2 pr-4">{t("value") || "Value"}</th>
                    <th className="py-2">%DV</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it: any, i: number) => {
                    const { label, value, daily } = toKV(it);
                    if (!label && !value) return null;
                    return (
                      <tr key={i} className="border-b border-neutral-100/60 dark:border-neutral-800/60">
                        <td className="py-2 pr-4 font-medium text-neutral-900 dark:text-neutral-100">{label || "-"}</td>
                        <td className="py-2 pr-4">{value || "-"}</td>
                        <td className="py-2">{daily || "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>
        );
      })()}

      {/* Images */}
      {frontmatter?.images?.length ? (
        <Section title={t("images")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {frontmatter.images.map((img: any, i: number) => (
              <figure key={i} className="rounded-lg overflow-hidden border border-neutral-200/60 dark:border-neutral-800 group bg-neutral-50 dark:bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={(pick(img?.caption, locale) || "") as string}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {(img?.caption?.zh || img?.caption?.en) && (
                  <figcaption className="text-xs p-2 text-neutral-600 dark:text-neutral-400">
                    {pick(img.caption, locale) as any}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {renderList(frontmatter?.serving_suggestions, (x) => (typeof x === "string" ? x : (pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")))) && (
        <Section title={t("serving")}>
          {renderList(frontmatter.serving_suggestions, (x) => (typeof x === "string" ? x : (pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))))}
        </Section>
      )}

      {renderList(frontmatter?.cultural_notes, (x) => (typeof x === "string" ? x : (pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")))) && (
        <Section title={t("culture")}>
          {renderList(frontmatter.cultural_notes, (x) => (typeof x === "string" ? x : (pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))))}
        </Section>
      )}

      {renderList(frontmatter?.related_drinks, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")) && (
        <Section title={t("related")}>
          {renderList(frontmatter.related_drinks, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
        </Section>
      )}

      {Array.isArray(frontmatter?.url) && frontmatter.url.length > 0 && (
        <Section title={t("links")}>
          <ul className="pl-0 space-y-2">
            {frontmatter.url.map((u: any, i: number) => {
              const href = typeof u === "string" ? u : u?.href;
              const title =
                typeof u === "string"
                  ? undefined
                  : (typeof u?.title === "string"
                      ? u.title
                      : (pick(u?.title, locale) || pick(u?.title, locale === "zh" ? "en" : "zh")));
              if (!href) return null;
              return (
                <li key={i} className="text-sm">
                  <a
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:underline break-all"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{title || href}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 opacity-70">
                      <path d="M12.5 2A1.5 1.5 0 0 1 14 3.5V6a1 1 0 1 1-2 0V5.414L8.707 8.707a1 1 0 0 1-1.414-1.414L10.586 4H9a1 1 0 1 1 0-2h3.5z"/>
                      <path d="M6 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H6V6h3a1 1 0 1 0 0-2H6z"/>
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {(frontmatter?.contributor || frontmatter?.updated_at) && (
        <div className="text-xs text-neutral-500">
          {frontmatter.contributor ? (
            <span className="mr-3">{t("contributor")}: {toDisplay(frontmatter.contributor)}</span>
          ) : null}
          {frontmatter.updated_at ? (
            <span>
              {t("updatedAt")}: {toDisplay(frontmatter.updated_at)}
            </span>
          ) : null}
        </div>
      )}

      {/* Markdown body */}
      {contentHtml ? (
        <Section title={t("history") || "Details"}>
          <article
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </Section>
      ) : null}
    </div>
  );
}
