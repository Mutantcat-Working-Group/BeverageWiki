"use client";
import React from "react";
import Link from "next/link";
import DrinkCard from "@/components/DrinkCard";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { useTranslation } from "@/i18n/Provider";
import GiscusComments from "@/components/GiscusComments";

type DrinkListItem = {
  slug: string;
  defaultTitle: string;
  locales: string[];
  tags?: string[];
};

const LOCALE_LABELS: Record<string, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語",
  ko: "한국어",
};

export default function DrinksExplorer({ drinks }: { drinks: DrinkListItem[] }) {
  const { t } = useTranslation();
  const [query, setQuery] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return drinks;
    return drinks.filter((d) => {
      const title = d.defaultTitle.toLowerCase();
      const tags = (d.tags || []).join(" ").toLowerCase();
      return title.includes(q) || tags.includes(q);
    });
  }, [query, drinks]);

  const showAll = React.useMemo(() => {
    return query.trim().length > 0 || expanded;
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
                  title={d.defaultTitle}
                  tags={d.tags}
                  locales={d.locales}
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
