'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ProductsLink = ({ children, to, onMouseEnter, onMouseLeave }: ProductsLinkProps) => {
  if (to) {
    return (
      <Link
        href={to}
        className={linkClassName}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span>{children}</span>
        {arrow}
      </Link>
    );
  }

  return (
    <p
      className={linkClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>{children}</span>
      {arrow}
    </p>
  );
};

export default ProductsLink;
