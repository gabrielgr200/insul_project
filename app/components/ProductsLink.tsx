'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContentTranslation } from "./LanguageProvider";

const linkClassName = `group flex justify-between items-center text-2xl
      font-light py-4 border-b cursor-pointer border-zinc-200 dark:border-zinc-700
      hover:text-zinc-900 dark:hover:text-[#ff5500] hover:font-semibold duration-200 ease-in transition-colors`;

const arrow = (
  <ArrowRight
    size={24}
    className="text-zinc-500 -rotate-30
      group-hover:rotate-360 duration-400 ease-in "
  />
);

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
        className={linkClassName}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span className={centered ? "flex-1 text-center font-semibold" : undefined}>{translateText(children)}</span>
        {translateText(arrow)}
      </Link>
    );
  }

  return (
    <p
      className={linkClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={centered ? "flex-1 text-center font-semibold" : undefined}>{translateText(children)}</span>
      {translateText(arrow)}
    </p>
  );
};

export default ProductsLink;
