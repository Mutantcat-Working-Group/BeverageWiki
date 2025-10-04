"use client";
import React from "react";
import { useTranslation } from "@/i18n/Provider";
import GiscusComments from "@/components/GiscusComments";

export default function ContributionClient() {
  const { t } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto mt-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold">{t("contribution")}</h1>

      <section className="rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-4 sm:p-5 shadow-sm space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">{t("contributionDevTitle")}</h2>
        <p className="leading-7 text-neutral-700 dark:text-neutral-300">
          {t("contributionDevIntro")}
          <a
            href="https://github.com/Mutantcat-Working-Group/BeverageWiki"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-600 hover:underline break-all"
          >
            {t("contributionDevLinkLabel")}
          </a>
        </p>
        <p className="text-sm text-neutral-500">
          {t("contributionDevNote")} <code>/drinks</code>
        </p>
      </section>

      <section className="rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-4 sm:p-5 shadow-sm space-y-3">
        <h2 className="text-lg sm:text-xl font-semibold">{t("contributionNondevTitle")}</h2>
        <p className="leading-7 text-neutral-700 dark:text-neutral-300">
          {t("contributionNondevIntro")}
        </p>
      </section>

      <div className="pt-2">
        <GiscusComments />
      </div>
    </main>
  );
}
