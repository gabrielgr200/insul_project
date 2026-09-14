'use client';

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollToSection } from "../utils/ScrollToSection";

interface NavDropdownItem {
  label: string;
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
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [itemsPos, setItemsPos] = useState({ top: 0, left: 0 });
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const navId = id || to;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (!columns && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setItemsPos({ top: rect.bottom + 12, left: rect.left + rect.width / 2 });
    }
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
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
      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 font-medium
      hover:text-[#ff5500] hover:bg-zinc-50 dark:hover:bg-white/5 hover:font-bold transition-colors duration-150
      px-3 py-1.5 rounded-lg leading-snug"
    >
      {item.icon && <item.icon size={14} className="shrink-0" />}
      <span>{item.label}</span>
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
        className={`flex items-center gap-1 hover:font-bold transition-all duration-300 ease-out hover:-translate-y-1
        uppercase tracking-wider border rounded-full outline-none
        focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2
        hover:text-[#ff5500] ${compact ? "text-[13px] py-1.5 px-3.5" : "text-sm p-2 px-4"} ${
          active
            ? "border-[#ff5500] font-bold text-[#ff5500] hover:border-[#ff5500]"
            : "border-transparent text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600"
        }`}
      >
        {label}
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
                className="fixed left-1/2 -translate-x-1/2 z-[200] transition-[top] duration-300 ease-out"
                style={{ originY: 0, top: megaMenuTop }}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <div
                  className="bg-white dark:bg-background border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-5
                  grid grid-cols-7
                  gap-x-6 gap-y-3 w-[94vw] max-w-[1120px] normal-case"
                >
                  {columns.map((col: NavDropdownColumn) => (
                    <motion.div
                      key={col.title}
                      variants={columnVariants}
                      className="flex flex-col gap-0.5 min-w-0"
                    >
                      <motion.span
                        variants={itemVariants}
                        className="text-xs text-[#ff5500] uppercase poppins tracking-wide font-bold px-3 pb-1"
                      >
                        {col.title}
                      </motion.span>
                      {col.items.map((item) => renderLink(item))}
                    </motion.div>
                  ))}
                </div>
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
