"use client";
import React from "react";
import { useTranslation } from "../i18n/Provider";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <label className="sr-only">{t("searchPlaceholder")}</label>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={t("searchPlaceholder")}
        />
      </div>
    </div>
  );
}
