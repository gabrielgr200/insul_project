"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "./LanguageProvider";
import Flag from "./Flag";
import { locales, localeNames, localeShort } from "../i18n";

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("aria.idioma")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-white/10 px-3 py-2 text-xs font-medium text-[#002d4d] dark:text-white backdrop-blur transition-colors hover:bg-zinc-100 dark:hover:bg-white/20 cursor-pointer"
      >
        <Flag locale={locale} className="h-3.5 w-[19px]" />
        <span>{localeShort[locale]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={locale === l}
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-white/10 ${
                    locale === l
                      ? "text-[#ff5500]"
                      : "text-zinc-700 dark:text-zinc-200"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Flag locale={l} className="h-3.5 w-[19px]" />
                    {localeNames[l]}
                  </span>
                  {locale === l && <Check size={15} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
