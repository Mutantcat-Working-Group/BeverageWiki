"use client";
import React from "react";
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
    <section>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </section>
  );

  const toDisplay = (v: any) => {
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    if (v === undefined || v === null) return "";
    return String(v);
  };

  const renderList = (arr?: any[], mapper?: (x: any) => string | undefined) => {
    if (!arr || arr.length === 0) return null;
    return (
      <ul className="list-disc pl-6 space-y-1">
        {arr.map((x, i) => {
          const text = mapper ? mapper(x) : String(x);
          if (!text) return null;
          return (
            <li key={i} className="text-neutral-800 dark:text-neutral-200 text-sm">
              {text}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="space-y-8">
      {/* Localized Title */}
      <h1 className="text-3xl font-bold mb-2">
        {pick(frontmatter?.title, locale) || pick(frontmatter?.title, locale === "zh" ? "en" : "zh")}
      </h1>
      {frontmatter?.description?.length ? (
        <p className="text-neutral-700 dark:text-neutral-300">
          {pick(frontmatter.description[0], locale) ||
            pick(frontmatter.description[0], locale === "zh" ? "en" : "zh")}
        </p>
      ) : null}

      {renderList(frontmatter?.aliases, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")) && (
        <Section title={t("aliases")}>
          {renderList(frontmatter.aliases, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
        </Section>
      )}

      {renderList(frontmatter?.tags, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh")) && (
        <Section title={t("tags")}>
          {renderList(frontmatter.tags, (x) => pick(x, locale) || pick(x, locale === "zh" ? "en" : "zh"))}
        </Section>
      )}

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

      {/* Nutrition: structure varies, print as key-value if available */}
      {frontmatter?.nutrition?.length ? (
        <Section title={t("nutrition")}>
          <ul className="pl-0 space-y-2">
            {frontmatter.nutrition.map((n: any, i: number) => {
              // Try zh schema first then en
              const zh = n?.zh;
              const en = n?.en;
              const label = zh?.项目 || en?.item;
              const value = zh?.数值 || en?.value;
              if (!label && !value) return null;
              return (
                <li key={i} className="text-sm">
                  <span className="font-medium">{label}</span>: {value}
                </li>
              );
            })}
          </ul>
        </Section>
      ) : null}

      {/* Images */}
      {frontmatter?.images?.length ? (
        <Section title={t("images")}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {frontmatter.images.map((img: any, i: number) => (
              <figure key={i} className="border rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={pick(img?.caption)} className="w-full h-auto" />
                {(img?.caption?.zh || img?.caption?.en) && (
                  <figcaption className="text-xs p-2 text-neutral-600 dark:text-neutral-400">
                    {pick(img.caption)}
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
          <ul className="list-disc pl-6 space-y-1">
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
                <li key={i}>
                  <a
                    className="text-blue-600 hover:underline break-all"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title || href}
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
        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : null}
    </div>
  );
}
