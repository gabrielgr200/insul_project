'use client';

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { scrollToSection } from "../utils/ScrollToSection";
import { useContentTranslation } from "./LanguageProvider";

interface NavDropdownItem {
  label: string;
  imageSrc?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface NavDropdownColumn {
  title: string;
  items: NavDropdownItem[];
}

const panelVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.97,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

interface NavDropdownProps {
  label: string;
  to?: string;
  id?: string;
  items?: NavDropdownItem[];
  columns?: NavDropdownColumn[];
  active?: boolean;
  onNavigate?: (id?: string) => void;
  onLabelClick?: () => void;
  megaMenuTop?: number;
  compact?: boolean;
}

const NavDropdown = ({
  label,
  to,
  id,
  items = [],
  columns,
  active = false,
  onNavigate,
  onLabelClick,
  megaMenuTop = 100,
  compact = false,
}: NavDropdownProps) => {
  const translateText = useContentTranslation();
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [submenuTop, setSubmenuTop] = useState(0);
  const dropdownId = useId();
  const [mounted, setMounted] = useState(false);
  const [itemsPos, setItemsPos] = useState({ top: 0, left: 0 });
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const navId = id || to;
  const activeGroup = columns?.find((group) => group.title === expandedGroup);

  const expandGroup = (title: string, button: HTMLButtonElement) => {
    const alignWithCategory = ["Tela Hexagonal", "Simples Torção", "Cercas Prontas", "Gradil"].includes(title);
    setSubmenuTop(alignWithCategory ? Math.max(0, button.offsetTop - 12) : 0);
    setExpandedGroup(title);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setItemsPos({ top: rect.bottom + 12, left: rect.left + rect.width / 2 });
    }
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
      setExpandedGroup(null);
    }, 180);
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onLabelClick) {
      onLabelClick();
    } else if (to) {
      scrollToSection(to);
    }
    onNavigate?.(navId);
    setOpen(false);
  };

  const renderLink = (item: NavDropdownItem) => (
    <motion.a
      key={item.label}
      variants={itemVariants}
      href={item.href || "#"}
      target={item.href?.startsWith("http") ? "_blank" : undefined}
      rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (item.onClick) {
          e.preventDefault();
          item.onClick();
        }
        onNavigate?.(navId);
        setOpen(false);
      }}
      className={`flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium
      hover:text-[#ff5500] hover:bg-zinc-50 dark:hover:bg-white/5 hover:font-bold transition-colors duration-150
      px-3 py-1.5 rounded-lg leading-snug`}
    >
      {columns && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
          <Image
            src={item.imageSrc || "/images/accessory-placeholder.svg"}
            alt=""
            width={32}
            height={32}
            sizes="32px"
            className="h-full w-full object-cover"
          />
        </span>
      )}
      {item.icon && <item.icon size={14} className="shrink-0" />}
      <span>{translateText(item.label)}</span>
    </motion.a>
  );

  return (
    <div
      ref={triggerRef}
      className="relative transition-all duration-300 ease-out"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        href={to ? `#${to}` : "#"}
        onClick={handleLabelClick}
        aria-expanded={open}
        onFocus={handleEnter}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "ArrowDown") {
            event.preventDefault();
            handleEnter();
          }
        }}
        className={`flex items-center gap-1 hover:font-bold transition-all duration-300 ease-out hover:-translate-y-1
        uppercase tracking-wider border rounded-full outline-none
        focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2
        hover:text-[#ff5500] ${compact ? "text-[13px] py-1.5 px-3.5" : "text-sm p-2 px-4"} ${
          active
            ? "border-[#ff5500] font-bold text-[#ff5500] hover:border-[#ff5500]"
            : "border-transparent text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600"
        }`}
      >
        {translateText(label)}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </a>

      {mounted &&
        columns &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed -translate-x-1/2 z-[200] transition-[top,left] duration-300 ease-out"
                style={{ originY: 0, top: megaMenuTop, left: itemsPos.left }}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <div className="flex w-[min(320px,94vw)] max-h-[calc(100svh-120px)] flex-col gap-1 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl normal-case dark:border-zinc-800 dark:bg-background">
                  {columns.map((col: NavDropdownColumn, index) => (
                    <motion.div key={col.title} variants={columnVariants} className="min-w-0">
                      <button
                        type="button"
                        aria-expanded={expandedGroup === col.title}
                        aria-controls={`${dropdownId}-${index}`}
                        onMouseEnter={(event) => expandGroup(col.title, event.currentTarget)}
                        onFocus={(event) => expandGroup(col.title, event.currentTarget)}
                        onClick={(event) => expandGroup(col.title, event.currentTarget)}
                        className={`relative flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#ff5500] ${expandedGroup === col.title ? "bg-zinc-100 text-[#ff5500] dark:bg-white/5" : "text-zinc-700 hover:bg-zinc-100 hover:text-[#ff5500] dark:text-zinc-200 dark:hover:bg-white/5"}`}
                      >
                        {translateText(col.title)}
                        <ChevronRight size={15} className="shrink-0" />
                      </button>
                    </motion.div>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {activeGroup && (
                    <motion.div
                      key={activeGroup.title}
                      id={`${dropdownId}-${columns.findIndex((group) => group.title === activeGroup.title)}`}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.2, staggerChildren: 0.025 } },
                        exit: { opacity: 0, x: -8, transition: { duration: 0.12 } },
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-full w-[332px] pl-3"
                      style={{ top: submenuTop }}
                    >
                      <div
                        className="flex flex-col gap-1 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl normal-case dark:border-zinc-800 dark:bg-background"
                        style={{ maxHeight: `calc(100svh - ${megaMenuTop + submenuTop + 20}px)` }}
                      >
                        {activeGroup.items.map((item) => renderLink(item))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {mounted &&
        !columns &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed -translate-x-1/2 z-[200]"
                style={{ top: itemsPos.top, left: itemsPos.left }}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <div className="bg-white dark:bg-background border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-3 flex flex-col gap-1 min-w-[220px] normal-case">
                  {items.map((item) => renderLink(item))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default NavDropdown;
