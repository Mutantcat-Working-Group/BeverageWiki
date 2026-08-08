import React from "react";

const LOCALE_LABELS: Record<string, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語",
  ko: "한국어",
};

export default function DrinkCard({
  title,
  tags,
  locales,
}: {
  title: string;
  tags?: string[];
  locales?: string[];
}) {
  return (
    <article className="w-full max-w-4xl mx-auto border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-medium hover:underline cursor-pointer truncate">{title}</h3>
        {locales && locales.length > 0 && (
          <div className="flex gap-1.5 shrink-0">
            {locales.map((loc) => (
              <span
                key={loc}
                className="inline-block px-2 py-0.5 text-xs rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800"
              >
                {LOCALE_LABELS[loc] || loc}
              </span>
            ))}
          </div>
        )}
      </div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
