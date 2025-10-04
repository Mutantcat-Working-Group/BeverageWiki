"use client";
import React from "react";
import Link from "next/link";
import DrinkCard from "@/components/DrinkCard";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { useI18n, useTranslation } from "@/i18n/Provider";
import { LocalizedString } from "@/lib/i18n";
import GiscusComments from "@/components/GiscusComments";

type DrinkListItem = {
  slug: string;
  title: LocalizedString;
  description?: Array<LocalizedString>;
  aliases?: Array<LocalizedString>;
  tags?: Array<LocalizedString>;
};

function pick(ls?: LocalizedString, locale: "zh" | "en" = "zh") {
  if (!ls) return undefined;
  return (ls as any)[locale] || (ls as any)[locale === "zh" ? "en" : "zh"];
}

export default function DrinksExplorer({ drinks }: { drinks: DrinkListItem[] }) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const [query, setQuery] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return drinks;
    return drinks.filter((d) => {
      const zh = pick(d.title, "zh")?.toLowerCase() || "";
      const en = pick(d.title, "en")?.toLowerCase() || "";
      const desc = (d.description || [])
        .map((x) => (pick(x, "zh") || pick(x, "en") || "").toLowerCase())
        .join(" ");
      const aliasText = (d.aliases || [])
        .map((x) => (pick(x, "zh") || pick(x, "en") || "").toLowerCase())
        .join(" ");
      const tagText = (d.tags || [])
        .map((x) => (pick(x, "zh") || pick(x, "en") || "").toLowerCase())
        .join(" ");
      return (
        zh.includes(q) ||
        en.includes(q) ||
        desc.includes(q) ||
        aliasText.includes(q) ||
        tagText.includes(q)
      );
    });
  }, [query, drinks]);

  const showAll = React.useMemo(() => {
    // 搜索时直接显示全部；否则依据“展开全部”状态
    return (query.trim().length > 0) || expanded;
  }, [query, expanded]);

  const visible = React.useMemo(() => {
    return showAll ? filtered : filtered.slice(0, 20);
  }, [showAll, filtered]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12">
      <Header title={t("siteTitle")} />

      <main className="max-w-4xl mx-auto mt-6 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold">{t("discover")}</h2>
        <SearchBar value={query} onChange={setQuery} />
        <section className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-neutral-500">{t("noResults")}</p>
          ) : (
            <>
            {visible.map((d) => (
              <Link key={d.slug} href={`/drink/${d.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
                <DrinkCard
                  title={pick(d.title, locale) || pick(d.title, locale === "zh" ? "en" : "zh") || d.slug}
                  description={
                    d.description && d.description.length > 0
                      ? pick(d.description[0], locale) || pick(d.description[0], locale === "zh" ? "en" : "zh")
                      : undefined
                  }
                />
              </Link>
            ))}
            {query.trim().length === 0 && filtered.length > 20 && (
              <div className="mt-2">
                {!showAll ? (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md border text-sm hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    onClick={() => setExpanded(true)}
                  >
                    {t("showAll")}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md border text-sm hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    onClick={() => setExpanded(false)}
                  >
                    {t("showLess")}
                  </button>
                )}
              </div>
            )}
            </>
          )}
        </section>
      </main>

      {/* Comments at the bottom of homepage */}
      <div className="max-w-4xl mx-auto mt-10">
        <GiscusComments />
      </div>
    </div>
  );
}
