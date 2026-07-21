"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import type { ProductCardData } from "../assets/data";

const ProductCard = ({
  src,
  title,
  name,
  paragraph,
  description,
  to,
}: ProductCardData) => {
  const [open, setOpen] = useState(false);
  const firstRender = useRef(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(chevronRef.current, { rotate: open ? 180 : 0 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: open ? 1 : 0 });
      gsap.set(panelRef.current, { height: open ? "auto" : 0 });
      return;
    }

    const panel = panelRef.current;

    gsap.to(chevronRef.current, {
      rotate: open ? 180 : 0,
      duration: 0.35,
      ease: "power2.out",
    });

    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        opacity: open ? 1 : 0,
        duration: 0.1,
        ease: "none",
        pointerEvents: open ? "auto" : "none",
      });
    }

    if (open) {
      gsap.set(panel, { height: "auto" });
      const targetHeight = panel!.offsetHeight;
      gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: targetHeight,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        },
      );
      gsap.fromTo(
        panelInnerRef.current!.children,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.08,
          delay: 0.12,
          ease: "power2.out",
        },
      );
    } else {
      gsap.to(panel, { height: 0, duration: 0.35, ease: "power2.in" });
      gsap.to(panelInnerRef.current!.children, { opacity: 0, duration: 0.15 });
    }
  }, [open]);

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/5 ring-1 ring-black/5">
      <div className="relative h-56 sm:h-64">
        <img
          src={src}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-5 text-white">
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-white/80">{title}</p>
        </div>

        {to && (
          <Link
            ref={ctaRef}
            href={to}
            className="group absolute bottom-4 right-4 rounded-full bg-white/20 px-6 py-2 text-xs font-medium text-white opacity-0 ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/30"
          >
            <span className="relative block h-4 overflow-hidden">
              <span className="block whitespace-nowrap transition-transform duration-300 ease-out group-hover:-translate-y-4">
                Gostou da tela?
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-4 block whitespace-nowrap transition-transform duration-300 ease-out group-hover:-translate-y-4"
              >
                Veja os detalhes
              </span>
            </span>
          </Link>
        )}
      </div>

      <div ref={panelRef} style={{ height: 0 }} className="overflow-hidden">
        <div ref={panelInnerRef} className="space-y-3 p-5">
          <div className="flex flex-wrap gap-2">
            {paragraph.split(", ").map((spec) => (
              <span
                key={spec}
                className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
              >
                {spec.trim()}
              </span>
            ))}
          </div>
          <p className="text-sm px-4 py-4 leading-relaxed text-zinc-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? `Recolher detalhes de ${name}` : `Ver detalhes de ${name}`}
        className="group flex w-full items-center justify-center gap-1.5 py-2 text-zinc-400 transition-colors hover:text-zinc-600"
      >
        <ChevronDown ref={chevronRef} size={18} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-200 ease-out group-hover:max-w-[3rem] group-hover:opacity-100">
          {open ? "Fechar" : "Abrir"}
        </span>
      </button>
    </div>
  );
};

export default ProductCard;
