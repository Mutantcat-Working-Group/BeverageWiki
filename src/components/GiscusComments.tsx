"use client";
import React from "react";
import Giscus from "@giscus/react";
import { useI18n } from "@/i18n/Provider";

export default function GiscusComments() {
  const { locale } = useI18n();

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO; // e.g. owner/repo
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY; // e.g. "Announcements"
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  const theme = (process.env.NEXT_PUBLIC_GISCUS_THEME as any) || "preferred_color_scheme";

  if (!repo || !repoId || !category || !categoryId) {
    // In production, silently hide the comments if not configured to avoid showing warnings on live site
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div className="mt-8 text-sm text-neutral-500">
        Giscus is not configured. Set NEXT_PUBLIC_GISCUS_REPO, NEXT_PUBLIC_GISCUS_REPO_ID, NEXT_PUBLIC_GISCUS_CATEGORY, NEXT_PUBLIC_GISCUS_CATEGORY_ID.
      </div>
    );
  }

  const repoSlug = repo as `${string}/${string}`;

  return (
    <div className="mt-8">
      <Giscus
        repo={repoSlug}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme as any}
        lang={locale === "zh" ? "zh-CN" : "en"}
        loading="lazy"
      />
    </div>
  );
}
