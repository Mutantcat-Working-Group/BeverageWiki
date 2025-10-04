"use client";
import React from "react";
import Link from "next/link";
import { useI18n } from "../i18n/Provider";

export default function Header({ title }: { title: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-6">
      <Link href="/" className="cursor-pointer">
        <h1 className="text-2xl font-semibold hover:opacity-90 transition" title={title}>
          {title}
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-500">{t("language")}</label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as "en" | "zh")}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  );
}
