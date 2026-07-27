'use client';

import { scrollToSection } from "../utils/ScrollToSection";

interface NavBtnProps {
  children: React.ReactNode;
  to?: string;
  active?: boolean;
  onNavigate?: (to?: string) => void;
  onClick?: () => void;
}

const NavBtn = ({ children, to, active = false, onNavigate, onClick }: NavBtnProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (to) {
      scrollToSection(to);
    }
    onNavigate?.(to);
  };

  return (
    <a
      href={to ? `#${to}` : "#"}
      onClick={handleClick}
      className={`text-sm hover:font-bold transition-all duration-150 ease-in hover:-translate-y-1
      uppercase tracking-wider border p-2 px-4 rounded-full outline-none
      focus-visible:ring-2 focus-visible:ring-[#ff5500] focus-visible:ring-offset-2
      hover:text-[#ff5500] ${
        active
          ? "border-[#ff5500] font-bold text-[#ff5500] hover:border-[#ff5500]"
          : "border-transparent text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600"
      }`}
    >
      {children}
    </a>
  );
};

export default NavBtn;
