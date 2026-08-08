"use client";
import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTranslation } from "@/i18n/Provider";

const LOCALE_LABELS: Record<string, string> = {
  zh: "中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
};

type Frontmatter = {
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

export default function DrinkDetail({
  locales,
  defaultLocale,
}: {
  locales: Record<string, { frontmatter: Frontmatter; contentHtml: string }>;
  defaultLocale: string;
}) {
  const { t } = useTranslation();
  const availableLocales = Object.keys(locales).sort();
  const [currentLocale, setCurrentLocale] = React.useState(defaultLocale);

  // Detect browser language on mount
  React.useEffect(() => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (availableLocales.includes(browserLang) && browserLang !== defaultLocale) {
      setCurrentLocale(browserLang);
    }
  }, []);

  const { frontmatter, contentHtml } = locales[currentLocale] || locales[defaultLocale];

  // Lightbox state
  const [lightbox, setLightbox] = React.useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const images: Array<{ url: string; caption?: string }> = frontmatter?.images || [];
  const openLightbox = (idx: number) => setLightbox({ open: true, index: idx });
  const closeLightbox = () => setLightbox((p) => ({ ...p, open: false }));
  const nextImage = () => setLightbox((p) => ({ ...p, index: (p.index + 1) % Math.max(images.length, 1) }));
  const prevImage = () => setLightbox((p) => ({ ...p, index: (p.index - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1) }));

  // Keyboard support & lock body scroll when lightbox is open
  React.useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); closeLightbox(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); nextImage(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prevImage(); }
    };
    const htmlEl = document.documentElement;
    const prevOverflowBody = document.body.style.overflow;
    const prevOverflowHtml = htmlEl.style.overflow;
    document.body.style.overflow = "hidden";
    htmlEl.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflowBody;
      htmlEl.style.overflow = prevOverflowHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox.open]);

  const CollapsibleParagraph = ({ text }: { text: string }) => {
    const [expanded, setExpanded] = React.useState(false);
    const limit = 160;
    const isLong = text && text.length > limit;
    const display = expanded || !isLong ? text : text.slice(0, limit) + "…";
    return (
      <div>
        <p className="text-neutral-700 dark:text-neutral-300 text-base leading-7">{display}</p>
        {isLong ? (
          <button
            type="button"
            className="mt-1 inline-block text-sm text-blue-600 hover:underline sm:hidden"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? (t("collapse") || "收起") : (t("expand") || "展开更多")}
          </button>
        ) : null}
      </div>
    );
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-4 sm:p-5 shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );

  const ChipList = ({ items }: { items: string[] }) => {
    const chips = items.filter(Boolean);
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

  const renderList = (arr?: string[]) => {
    if (!arr || arr.length === 0) return null;
    return (
      <ul className="list-disc pl-6 space-y-1 marker:text-neutral-400">
        {arr.map((text, i) => {
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

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Language Switcher */}
      {availableLocales.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-wide text-neutral-500">{t("language") || "语言"}:</span>
          {availableLocales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setCurrentLocale(loc)}
              className={`px-3 py-1 text-sm rounded-full border transition ${
                currentLocale === loc
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {LOCALE_LABELS[loc] || loc}
            </button>
          ))}
        </div>
      )}

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {frontmatter?.title || ""}
        </h1>
        <div className="flex flex-col gap-3">
          {frontmatter?.tags && frontmatter.tags.length > 0 ? (
            <div className="flex items-start gap-2">
              <span className="text-xs uppercase tracking-wide text-neutral-500 mt-1 shrink-0 whitespace-nowrap">{t("tags")}</span>
              <ChipList items={frontmatter.tags} />
            </div>
          ) : null}
          {frontmatter?.aliases && frontmatter.aliases.length > 0 ? (
            <div className="flex items-start gap-2">
              <span className="text-xs uppercase tracking-wide text-neutral-500 mt-1 shrink-0 whitespace-nowrap">{t("aliases")}</span>
              <ChipList items={frontmatter.aliases} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Description */}
      {frontmatter?.description && frontmatter.description.length > 0 && (
        <div className="space-y-3">
          {frontmatter.description.map((d, i) => {
            if (!d) return null;
            return <CollapsibleParagraph key={i} text={d} />;
          })}
        </div>
      )}

      {/* Manufacturer */}
      {renderList(frontmatter?.manufacturer) && (
        <Section title={t("manufacturer")}>{renderList(frontmatter.manufacturer)}</Section>
      )}

      {/* Origin */}
      {renderList(frontmatter?.origin) && (
        <Section title={t("origin")}>{renderList(frontmatter.origin)}</Section>
      )}

      {/* History */}
      {renderList(frontmatter?.history) && (
        <Section title={t("history")}>{renderList(frontmatter.history)}</Section>
      )}

      {/* Legend */}
      {renderList(frontmatter?.legend) && (
        <Section title={t("legend")}>{renderList(frontmatter.legend)}</Section>
      )}

      {/* Ingredients */}
      {renderList(frontmatter?.ingredients) && (
        <Section title={t("ingredients")}>{renderList(frontmatter.ingredients)}</Section>
      )}

      {/* Nutrition */}
      {frontmatter?.nutrition && frontmatter.nutrition.length > 0 && (() => {
        const items = frontmatter.nutrition;
        const getLabel = (o: Record<string, string>) => o.item || o.项目 || o.name || o.label || "";
        const getValue = (o: Record<string, string>) => o.value || o.数值 || o.amount || "";
        const getUnit = (o: Record<string, string>) => o.unit || o.单位 || "";
        const getDaily = (o: Record<string, string>) => o.daily || o.dv || o.percent || "";

        return (
          <Section title={t("nutrition")}>
            {/* Mobile: stacked list */}
            <div className="sm:hidden space-y-2">
              {items.map((it, i) => {
                const label = getLabel(it);
                const unit = getUnit(it);
                const daily = getDaily(it);
                const value = [getValue(it), unit].filter(Boolean).join(" ");
                if (!label && !value) return null;
                return (
                  <div key={i} className="rounded-lg border border-neutral-200/60 dark:border-neutral-800 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">{label || "-"}</div>
                      <div className="text-sm text-neutral-700 dark:text-neutral-300">{value || "-"}</div>
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">%DV: {daily || "-"}</div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-600 dark:text-neutral-400 border-b border-neutral-200/60 dark:border-neutral-800">
                    <th className="py-2 pr-4">{t("nutrition")}</th>
                    <th className="py-2 pr-4">{t("value") || "Value"}</th>
                    <th className="py-2">%DV</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => {
                    const label = getLabel(it);
                    const unit = getUnit(it);
                    const daily = getDaily(it);
                    const value = [getValue(it), unit].filter(Boolean).join(" ");
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
      {images.length > 0 && (
        <Section title={t("images")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {images.map((img, i) => (
              <figure key={i} className="relative rounded-lg overflow-hidden border border-neutral-200/60 dark:border-neutral-800 group bg-neutral-50 dark:bg-neutral-900">
                <button
                  type="button"
                  aria-label={img.caption || "Open image"}
                  className="absolute inset-0 z-10 focus:outline-none"
                  onClick={() => openLightbox(i)}
                >
                  <span className="sr-only">Open image</span>
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.caption || ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02] cursor-zoom-in"
                />
                {img.caption && (
                  <figcaption className="text-xs p-2 text-neutral-600 dark:text-neutral-400">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Section>
      )}

      {/* Lightbox */}
      {lightbox.open && images.length > 0 && (() => {
        const current = images[lightbox.index] || {} as any;
        return createPortal((
          <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
              </svg>
            </button>
            {images.length > 1 && (
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-2 sm:left-4 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12.707 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 1 1 1.414 1.414L8.414 10l4.293 4.293a1 1 0 0 1 0 1.414Z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            {images.length > 1 && (
              <button
                type="button"
                aria-label="Next"
                className="absolute right-2 sm:right-4 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M7.293 4.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L11.586 10 7.293 5.707a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <div className="max-w-[95vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.url}
                alt={current.caption || ""}
                className="max-w-full max-h-[85vh] object-contain select-none"
                draggable={false}
              />
              {current.caption && (
                <div className="mt-2 text-center text-xs text-neutral-200">{current.caption}</div>
              )}
            </div>
          </div>
        ), document.body);
      })()}

      {/* Serving suggestions */}
      {renderList(frontmatter?.serving_suggestions) && (
        <Section title={t("serving")}>{renderList(frontmatter.serving_suggestions)}</Section>
      )}

      {/* Cultural notes */}
      {renderList(frontmatter?.cultural_notes) && (
        <Section title={t("culture")}>{renderList(frontmatter.cultural_notes)}</Section>
      )}

      {/* Related drinks */}
      {renderList(frontmatter?.related_drinks) && (
        <Section title={t("related")}>{renderList(frontmatter.related_drinks)}</Section>
      )}

      {/* External links */}
      {frontmatter?.url && frontmatter.url.length > 0 && (
        <Section title={t("links")}>
          <ul className="pl-0 space-y-2">
            {frontmatter.url.map((u, i) => {
              const href = typeof u === "string" ? u : u?.href;
              const linkTitle = typeof u === "string" ? undefined : u?.title;
              if (!href) return null;
              return (
                <li key={i} className="text-sm">
                  <a
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:underline break-all"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{linkTitle || href}</span>
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

      {/* Contributor & date */}
      {(frontmatter?.contributor || (frontmatter?.updated_at && typeof frontmatter.updated_at === "string")) && (
        <div className="text-xs text-neutral-500">
          {frontmatter.contributor ? (
            <span className="mr-3">{t("contributor")}: {String(frontmatter.contributor)}</span>
          ) : null}
          {frontmatter.updated_at && typeof frontmatter.updated_at === "string" ? (
            <span>{t("updatedAt")}: {frontmatter.updated_at}</span>
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
