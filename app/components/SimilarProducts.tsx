"use client";

import styles from "./SimilarProducts.module.css";
import Image from "next/image";
import Link from "next/link";


import { ArrowUpRight } from "lucide-react";
import type { ProductCardData } from "../assets/data";
import { useTranslation } from "./LanguageProvider";
import { useContentTranslation } from "./LanguageProvider";

export interface SimilarProductItem
  extends Pick<ProductCardData, "src" | "title" | "name" | "to"> {
  color: string;
  cutout?: string;
}

type SimilarCardProps = SimilarProductItem;

export const SimilarProductCard = ({
  src,
  title,
  name,
  to,
  color,
  cutout,
}: SimilarCardProps) => {
  const translateText = useContentTranslation();
  const { dict } = useTranslation();
  return (
    <Link
      href={to || "#"}


      style={{ backgroundColor: color }}
      className={`${styles.card} relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-lg shadow-black/10`}
    >
      <Image

        src={src}
        alt={translateText(name)}
        fill
        quality={90}
        sizes="(min-width: 1024px) 33vw, 50vw"
        className={`${styles.image} ${cutout ? styles.withCutout : ""} object-cover`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10" />

      {cutout && (
        <div className={`${styles.cutout} pointer-events-none absolute inset-x-0 bottom-0 h-[95%]`}>
          <Image
            src={cutout}
            alt=""
            aria-hidden="true"
            fill
            quality={75}
            sizes="(min-width: 1024px) 30vw, 80vw"
            className="object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      )}

      <div className="relative flex items-start justify-between">
        <span className="poppins text-xs font-semibold tracking-wide text-white/90 uppercase">
          {translateText(title)}
        </span>
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          <span

            className={`${styles.badge} absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm`}
          />
          <ArrowUpRight className={`${styles.arrow} relative h-4 w-4 text-white`} />
        </span>
      </div>

      <div className="relative flex flex-col gap-0.5">
        <span className="poppins text-base font-bold text-white">{translateText(name)}</span>
        <span className="poppins truncate text-[11px] text-white/75">
          {dict.productCard.seeDetails}
        </span>
      </div>
    </Link>
  );
};

const SimilarProducts = ({
  products,
  heading,
}: {
  products: SimilarProductItem[];
  heading?: string;
}) => {
  const { dict } = useTranslation();
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h3 className="poppins mb-8 text-4xl font-bold text-[#ff5500] dark:text-white">
        {heading ?? dict.similarProducts.heading}
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <SimilarProductCard key={product.to} {...product} />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
