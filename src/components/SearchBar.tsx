"use client";
import React from "react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <label className="sr-only">搜索饮料</label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="搜索饮料，例如：可乐、拿铁、绿茶..."
        />
      </div>
    </div>
  );
}
