"use client";

import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import DrinkCard from "../components/DrinkCard";

type Drink = {
  id: string;
  title: string;
  type?: string;
  description?: string;
};

const SAMPLE_DRINKS: Drink[] = [
  {
    id: "1",
    title: "可乐",
    type: "碳酸饮料",
    description: "经典含糖碳酸饮料，适合搭配快餐。",
  },
  {
    id: "2",
    title: "拿铁",
    type: "咖啡",
    description: "牛奶与浓缩咖啡的经典组合，口感顺滑。",
  },
  {
    id: "3",
    title: "绿茶",
    type: "茶饮",
    description: "清新解渴，富含抗氧化物。",
  },
  {
    id: "4",
    title: "橙汁",
    type: "果汁",
    description: "新鲜压榨的橙汁，维生素C丰富。",
  },
];

export default function Home() {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE_DRINKS;
    return SAMPLE_DRINKS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        (d.type || "").toLowerCase().includes(q) ||
        (d.description || "").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12">
      <Header title="BeverageWiki" />

      <main className="max-w-4xl mx-auto mt-6 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold">发现饮料</h2>

        <SearchBar value={query} onChange={setQuery} />

        <section className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-neutral-500">未找到匹配项。</p>
          ) : (
            filtered.map((d) => (
              <DrinkCard
                key={d.id}
                title={d.title}
                type={d.type}
                description={d.description}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
