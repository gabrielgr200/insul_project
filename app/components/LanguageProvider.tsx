"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { dictionaries, locales, type Locale } from "../i18n";

const STORAGE_KEY = "insul-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
  dict: (typeof dictionaries)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const htmlLang = (locale: Locale) => (locale === "pt" ? "pt-br" : locale);

function resolve(dict: unknown, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>(
    (acc, key) =>
      acc && typeof acc === "object"
        ? (acc as Record<string, unknown>)[key]
        : undefined,
    dict,
  );
  return typeof value === "string" ? value : undefined;
}

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && locales.includes(saved)) {
      setLocaleState(saved);
      document.documentElement.lang = htmlLang(saved);
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = htmlLang(next);
  }, []);

  const t = useCallback(
    (path: string) =>
      resolve(dictionaries[locale], path) ??
      resolve(dictionaries.pt, path) ??
      path,
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t, dict: dictionaries[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation deve ser usado dentro de LanguageProvider");
  }
  return ctx;
}
