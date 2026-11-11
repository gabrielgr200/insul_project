'use client';

import Link from "next/link";
import animation from "./FillButton.module.css";

import { useContentTranslation } from "./LanguageProvider";

const linkClassName = `group flex justify-between items-center text-2xl
      font-light py-4 border-b cursor-pointer border-zinc-200 dark:border-zinc-700
      hover:text-zinc-900 dark:hover:text-[#ff5500] duration-200 ease-in transition-colors`;

const arrow = <span aria-hidden="true">↗</span>;

interface ProductsLinkProps {
  children: React.ReactNode;
  to?: string;
  centered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ProductsLink = ({ children, to, centered = false, onMouseEnter, onMouseLeave }: ProductsLinkProps) => {
  const translateText = useContentTranslation();
  if (to) {
    return (
      <Link
        href={to}
        className={`${animation.button} ${linkClassName}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span className={animation.label}><span className={animation.text}><span className={centered ? "flex-1 text-center font-semibold" : undefined}>{translateText(children)}</span>{arrow}</span><span aria-hidden="true" className={`${animation.text} ${animation.copy}`}><span>{translateText(children)}</span>{arrow}</span></span>
      </Link>
    );
  }

  return (
    <p
      className={`${animation.button} ${linkClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={animation.label}><span className={animation.text}><span className={centered ? "flex-1 text-center font-semibold" : undefined}>{translateText(children)}</span>{arrow}</span><span aria-hidden="true" className={`${animation.text} ${animation.copy}`}><span>{translateText(children)}</span>{arrow}</span></span>
    </p>
  );
};

export default ProductsLink;
