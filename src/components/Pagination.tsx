"use client";

import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    // Always show first, last, current and neighbors
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const btn = (
    label: React.ReactNode,
    page: number,
    disabled = false,
    active = false,
    key?: string,
  ) => (
    <button
      key={key || String(label)}
      type="button"
      disabled={disabled}
      onClick={() => {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`min-w-[36px] h-9 px-2.5 rounded-lg text-sm font-medium transition
        ${active
          ? "bg-blue-600 text-white shadow-sm"
          : disabled
            ? "text-neutral-300 dark:text-neutral-600 cursor-not-allowed"
            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-6" aria-label="Pagination">
      {btn("‹", currentPage - 1, currentPage === 1, false, "prev")}
      {getPages().map((p, i) =>
        p === "..."
          ? <span key={`dots-${i}`} className="px-1 text-neutral-400">…</span>
          : btn(p, p, false, p === currentPage, `page-${p}`)
      )}
      {btn("›", currentPage + 1, currentPage === totalPages, false, "next")}
    </nav>
  );
}
