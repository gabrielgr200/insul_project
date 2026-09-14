"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslation } from "./LanguageProvider";

type ThemeMode = "light" | "dark";

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleOpen = () => {
    setOpen((o) => {
      const next = !o;
      if (next && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
      }
      return next;
    });
  };

  const current: ThemeMode = resolvedTheme === "dark" ? "dark" : "light";
  const options: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
    { value: "light", label: t("tema.claro"), icon: Sun },
    { value: "dark", label: t("tema.escuro"), icon: Moon },
  ];

  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-white/10 text-[#002d4d] dark:text-white backdrop-blur"
      >
        <Sun size={15} />
      </button>
    );
  }

  const CurrentIcon = current === "dark" ? Moon : Sun;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={t("aria.tema")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-white/10 text-[#002d4d] dark:text-white backdrop-blur transition-colors hover:bg-zinc-100 dark:hover:bg-white/20 cursor-pointer"
      >
        <CurrentIcon size={15} />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-[200] w-36 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
              style={{ top: pos.top, right: pos.right }}
            >
              {options.map(({ value, label, icon: Icon }) => (
                <li key={value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={current === value}
                    onClick={() => {
                      setTheme(value);
                      setOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-white/10 ${
                      current === value
                        ? "text-[#ff5500]"
                        : "text-zinc-700 dark:text-zinc-200"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={15} />
                      {label}
                    </span>
                    {current === value && <Check size={15} />}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default ThemeSwitcher;
