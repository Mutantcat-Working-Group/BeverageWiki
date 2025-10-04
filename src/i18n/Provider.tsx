"use client";

import React from "react";
import en from "./en.json";
import zh from "./zh.json";

type Locale = "en" | "zh";

const resources: Record<Locale, Record<string, string>> = {
  en,
  zh,
};

const I18nContext = React.createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
} | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>("zh");

  const t = React.useCallback(
    (key: string) => {
      return resources[locale][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useTranslation() {
  const { t } = useI18n();
  return { t };
}
