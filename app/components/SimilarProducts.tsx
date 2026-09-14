"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { ProductCardData } from "../assets/data";
import { useTranslation } from "./LanguageProvider";

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
  const { dict } = useTranslation();
  const imgRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const cutoutRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.set(imgRef.current, { opacity: 1, scale: 1 });
    gsap.set(badgeRef.current, { scale: 0, opacity: 0 });
    gsap.set(cutoutRef.current, { opacity: 0, y: 16, scale: 0.92 });
  }, []);

  const handleEnter = () => {
    gsap.to(imgRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(badgeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: "back.out(2)",
    });
    gsap.to(cutoutRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      delay: 0.05,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(imgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(badgeRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(cutoutRef.current, {
      opacity: 0,
      y: 16,
      scale: 0.92,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <Link
      href={to || "#"}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ backgroundColor: color }}
      className="group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-lg shadow-black/10"
    >
      <img
        ref={imgRef}
        src={src}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10" />

      {cutout && (
        <img
          ref={cutoutRef}
          src={cutout}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[95%] w-auto object-contain object-bottom drop-shadow-2xl"
        />
      )}

      <div className="relative flex items-start justify-between">
        <span className="poppins text-xs font-semibold tracking-wide text-white/90 uppercase">
          {title}
        </span>
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          <span
            ref={badgeRef}
            className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"
          />
          <ArrowUpRight className="relative h-4 w-4 text-white" />
        </span>
      </div>

      <div className="relative flex flex-col gap-0.5">
        <span className="poppins text-base font-bold text-white">{name}</span>
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
