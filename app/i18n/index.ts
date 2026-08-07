import pt from "./pt";
import en from "./en";
import es from "./es";

export type { Dictionary } from "./pt";

export const dictionaries = { pt, en, es };

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export const localeShort: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};
