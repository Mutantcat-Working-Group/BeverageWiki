"use client";
import React from "react";
import Link from "next/link";
import DrinkCard from "@/components/DrinkCard";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import GiscusComments from "@/components/GiscusComments";
import { useTranslation } from "@/i18n/Provider";

type DrinkListItem = {
  slug: string;
  defaultTitle: string;
  locales: string[];
  tags?: string[];
};

const PAGE_SIZE = 12;

export default function DrinksExplorer({ drinks }: { drinks: DrinkListItem[] }) {
  const { t } = useTranslation();
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [isPending, startTransition] = React.useTransition();

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return drinks;
    return drinks.filter((d) => {
      const title = d.defaultTitle.toLowerCase();
      const tags = (d.tags || []).join(" ").toLowerCase();
      return title.includes(q) || tags.includes(q);
    });
  }, [query, drinks]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const visible = React.useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const handleQueryChange = React.useCallback((val: string) => {
    setQuery(val);
    startTransition(() => {
      setPage(1);
    });
  }, []);

  const handlePageChange = React.useCallback((p: number) => {
    startTransition(() => {
      setPage(p);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12">
      <Header title={t("siteTitle")} />

      <main className="max-w-4xl mx-auto mt-6 flex flex-col gap-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-3xl font-semibold">{t("discover")}</h2>
          <span className="text-sm text-neutral-500 shrink-0">
            {filtered.length} {t("results") || "款饮料"}
          </span>
        </div>
        <SearchBar value={query} onChange={handleQueryChange} />

        <section className={`flex flex-col gap-4 transition-opacity duration-150 ${isPending ? "opacity-60" : "opacity-100"}`}>
          {filtered.length === 0 ? (
            <p className="text-sm text-neutral-500">{t("noResults")}</p>
          ) : (
            <>
              {visible.map((d) => (
                <Link
                  key={d.slug}
                  href={`/drink/${d.slug}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
                >
                  <DrinkCard
                    title={d.defaultTitle}
                    tags={d.tags}
                    locales={d.locales}
                  />
                </Link>
              ))}
            </>
          )}
        </section>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      {/* Comments at the bottom of homepage */}
      <div className="max-w-4xl mx-auto mt-10">
        <GiscusComments />
      </div>
    </div>
  );
}
