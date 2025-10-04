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

  // Initialize locale on first client visit: use stored choice, otherwise detect from browser
  React.useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("i18n_locale") : null;
      if (stored === "zh" || stored === "en") {
        setLocale(stored);
        return;
      }
      const lang = (typeof navigator !== "undefined" && (navigator.languages?.[0] || navigator.language)) || "";
      const isZh = /^zh\b/i.test(lang);
      setLocale(isZh ? "zh" : "en");
    } catch {
      // noop
    }
  }, []);

  // Persist locale changes
  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("i18n_locale", locale);
    } catch {
      // noop
    }
  }, [locale]);

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
